import request, {
  RequestAPI,
  Request,
  Response,
  CoreOptions,
  RequiredUriUrl
} from "request";
import {
  buildFilter,
  createFilterExpression,
  FilterFunction,
  FilterExpression
} from "./filter";

interface ODataRequestAPI
  extends RequestAPI<Request, CoreOptions, RequiredUriUrl> {}

export interface ODataClientOptions {
  serviceRoot: string;
}

type ODataId =
  | string
  | number
  | Guid
  | { [key: string]: string | number | Guid };

interface ODataResourceEntry {
  resource: string;
  id?: ODataId;
}

export class Guid {
  private _guid: string;

  constructor(guid: string) {
    this._guid = guid;
  }

  toString() {
    return this._guid;
  }
}

class ODataError extends Error {
  private _code: string;

  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this._code = code;
  }

  get code() {
    return this._code;
  }
}

class ODataQuery<T extends {}> implements Promise<T> {
  protected _promise: Promise<T>;
  protected _resolve: (data?: T) => any;
  protected _reject: (reason?: any) => any;
  protected _client: ODataClient;
  protected _resources: ODataResourceEntry[];

  constructor(client: ODataClient, resources: ODataResourceEntry[]) {
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._resources = resources;
    this._client = client;
  }

  protected get _resourcePath() {
    function mapValue(value: ODataId): String {
      if (typeof value === "string") {
        return `'${value}'`;
      } else if (typeof value === "object" && !(value instanceof Guid)) {
        return Object.entries(value)
          .map(([key, value]) => `${key}=${mapValue(value)}`)
          .join(",");
      } else if (typeof value !== "undefined" && value !== null) {
        return value.toString();
      }
    }

    return this._resources
      .map(({ resource, id }) => {
        if (id) {
          return `/${resource}(${mapValue(id)})`;
        } else {
          return `/${resource}`;
        }
      })
      .join("");
  }

  end(cb?: (error: any, response: Response, body: any) => void) {}

  then<TResult1, TResult2>(
    onFulfilled?: (value?: T) => TResult1 | PromiseLike<TResult1>,
    onRejected?: (reason?: any) => TResult2 | PromiseLike<TResult2>
  ): Promise<TResult1 | TResult2> {
    this.end((error, response, body) => {
      if (error) this._reject(error);
      else this._resolve(body);
    });
    return this._promise.then(onFulfilled, onRejected);
  }

  catch(onRejected?: (reason?: any) => any) {
    return this.then(null, onRejected);
  }

  finally(onFinally: () => void) {
    return this._promise.finally(onFinally);
  }

  get [Symbol.toStringTag]() {
    return "[object ODataQuery]";
  }
}

export class ODataGetQuery<T extends {}> extends ODataQuery<T> {
  private _select: string[];
  private _filter?: FilterExpression;

  constructor(client: ODataClient, resources: ODataResourceEntry[]) {
    super(client, resources);
    this._select = [];
  }

  filter(fn: FilterFunction) {
    const newFilter = createFilterExpression(fn);
    if (this._filter) {
      this._filter = createFilterExpression(f =>
        f.and(this._filter, newFilter)
      );
    } else {
      this._filter = newFilter;
    }
    return this;
  }

  select(...properties: string[]) {
    this._select.push(...properties);
    return this;
  }

  end(cb?: (error: any, response: Response, body: any) => void) {
    const select = this._select.join(", ");
    const filter = buildFilter(this._filter);
    const query = [select && `$select=${select}`, filter && `$filter=${filter}`]
      .filter(Boolean)
      .join("&");
    const url = `${this._resourcePath}${query ? `?${query}` : ""}`;
    this._client.request.get(url, (error, response, body) => {
      if (error) {
        console.log(`ODATA GET ${url} ERROR`);
        cb && cb(error, response, body);
      } else {
        console.log(`ODATA GET ${url} ${response.statusCode}`);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          cb &&
            cb(error, response, Array.isArray(body.value) ? body.value : body);
        } else if (response.statusCode >= 400) {
          if (body) {
            cb && cb(new ODataError(body.code, body.message), response, body);
          } else {
            cb && cb(new Error("Unknown error"), response, body);
          }
        }
      }
    });
  }
}

export class ODataPostQuery<T extends {}> extends ODataQuery<T> {
  private _body: Partial<T>;

  constructor(
    client: ODataClient,
    resources: ODataResourceEntry[],
    doc: Partial<T>
  ) {
    super(client, resources);
    this._body = doc;
  }

  end(cb?: (error: any, response: Response, body: any) => void) {
    this._client.request.post(
      this._resourcePath,
      { body: this._body },
      (error, response, body) => {
        if (error) {
          console.log(`ODATA POST ${this._resourcePath} ERROR`);
          cb && cb(error, response, body);
        } else {
          console.log(
            `ODATA POST ${this._resourcePath} ${response.statusCode}`
          );
          if (response.statusCode >= 200 && response.statusCode < 300) {
            cb &&
              cb(
                error,
                response,
                Array.isArray(body.value) ? body.value : body
              );
          } else if (response.statusCode >= 400) {
            if (body) {
              console.log(body && body.error);
              cb &&
                cb(
                  new ODataError(body.error.code, body.error.message),
                  response,
                  body
                );
            } else {
              cb && cb(new Error("Unknown error"), response, body);
            }
          }
        }
      }
    );
  }
}

export class ODataResource {
  private _resources: ODataResourceEntry[];
  private _client: ODataClient;

  constructor(client: ODataClient, resource: string, id?: ODataId) {
    this._client = client;
    this._resources = [{ resource, id }];
  }

  resource(resource: string, id?: ODataId) {
    this._resources.push({ resource, id });
    return this;
  }

  get<T extends {}>() {
    return new ODataGetQuery<T>(this._client, this._resources);
  }

  post<T extends {}>(doc: Partial<T>) {
    return new ODataPostQuery<T>(this._client, this._resources, doc);
  }
}

export class ODataClient {
  private _options: ODataClientOptions;
  private _request: ODataRequestAPI;

  constructor(options: ODataClientOptions) {
    this._options = options;
    this.clearAuth();
  }

  get request() {
    return this._request;
  }

  auth(username: string, password: string) {
    this._request = request.defaults({
      auth: { username, password },
      baseUrl: this._options.serviceRoot,
      json: true
    });
  }

  clearAuth() {
    this._request = request.defaults({
      baseUrl: this._options.serviceRoot,
      json: true
    });
  }

  resource(resource: string, id?: ODataId) {
    return new ODataResource(this, resource, id);
  }
}
