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
import { NavErrorCode } from "./types";

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

export class ODataError extends Error {
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
  protected _method: string;

  constructor(
    client: ODataClient,
    method: string,
    resources: ODataResourceEntry[]
  ) {
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._method = method;
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

  protected _handleResponse(
    url: string,
    cb: (error: any, response: Response, body: any) => void = () => {}
  ) {
    return (error: any, response: Response, body: any) => {
      // Error in http library.
      if (error) {
        console.log(`ODATA ${this._method} ${url} ERROR`);
        cb(error, response, body);
      }
      // Completed network request.
      else {
        console.log(`ODATA ${this._method} ${url} ${response.statusCode}`);
        // Request completed successfully.
        if (response.statusCode >= 200 && response.statusCode < 300) {
          cb(error, response, Array.isArray(body.value) ? body.value : body);
        }
        // Error occured in handling the request.
        else if (response.statusCode >= 400) {
          let navError: ODataError;
          // Response has an error object
          if (body && body.error) {
            // License error has to be handled separately since it does not have its own error code.
            if (
              body.error.code === NavErrorCode.Unknown &&
              body.error.message.includes(
                "Your program license does not permit more users to work simultaneously"
              )
            ) {
              navError = new ODataError(
                NavErrorCode.NoAvailableLicense,
                body.error.message
              );
            }
            // Normal error with code and message.
            else {
              navError = new ODataError(body.error.code, body.error.message);
            }
          }
          // Response has no error object.
          else {
            navError = new ODataError(
              NavErrorCode.Unknown,
              `${response.statusCode}`
            );
          }

          cb(navError, response, body);
        }
      }
    };
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
    super(client, "GET", resources);
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
    this._client.request.get(url, this._handleResponse(url, cb));
  }
}

export class ODataPostQuery<T extends {}> extends ODataQuery<T> {
  private _body: Partial<T>;

  constructor(
    client: ODataClient,
    resources: ODataResourceEntry[],
    doc: Partial<T>
  ) {
    super(client, "POST", resources);
    this._body = doc;
  }

  end(cb?: (error: any, response: Response, body: any) => void) {
    const url = this._resourcePath;
    this._client.request.post(
      url,
      { body: this._body },
      this._handleResponse(url, cb)
    );
  }
}

export class ODataPatchQuery<T extends {}> extends ODataQuery<T> {
  private _body: Partial<T>;

  constructor(
    client: ODataClient,
    resources: ODataResourceEntry[],
    doc: Partial<T>
  ) {
    super(client, "PATCH", resources);
    this._body = doc;
  }

  end(cb?: (error: any, response: Response, body: any) => void) {
    const url = this._resourcePath;
    this._client.request.get(
      url,
      { body: this._body },
      (error: any, response: Response, body: any) => {
        if (error) {
          cb && cb(error, response, body);
        } else if (body["@odata.etag"]) {
          this._client.request.patch(
            url,
            {
              body: this._body,
              headers: {
                "If-Match": body["@odata.etag"]
              }
            },
            this._handleResponse(url, cb)
          );
        } else {
          cb && cb(new Error("OData resource does not exist"), response, body);
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

  patch<T extends {}>(doc: Partial<T>) {
    return new ODataPatchQuery<T>(this._client, this._resources, doc);
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
