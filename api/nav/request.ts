import request from "httpntlm";

export interface Filter {
  [prop: string]: any[] | any;
}

export interface NavRequest<T = string> {
  resource: string;
  filter?: Filter;
  username: string;
  password: string;
  method: string;
  body?: T;
  headers?: {
    [header: string]: string;
  };
}

export interface NavGetRequest {
  resource: string;
  filter?: Filter;
  username: string;
  password: string;
  headers?: {
    [header: string]: string;
  };
}

export interface NavPostRequest<T = string> {
  resource: string;
  filter?: Filter;
  username: string;
  password: string;
  body?: T;
  headers?: {
    [header: string]: string;
  };
}

export interface NavResponse<T = string> {
  statusCode: number;
  body?: T;
  headers?: {
    [header: string]: string;
  };
}

export interface NavGetResponse<T = string>
  extends NavResponse<{ value: T[] }> {}

export interface NavPostResponse<T = string> extends NavResponse<T> {}

export interface NavErrorResponse {
  statusCode: number;
  body?: string;
  headers?: {
    [header: string]: string;
  };
}

export class NavError<Req> extends Error {
  request: NavRequest<Req>;
  response: NavErrorResponse;

  constructor(request: NavRequest<Req>, response: NavErrorResponse) {
    super(`Bad response from nav: ${request.resource} ${response.statusCode}`);
    this.name = "NavError";
    this.request = request;
    this.response = response;
  }
}

function buildFilter(filters: Filter): string {
  const filter = Object.keys(filters)
    .map(prop => {
      const joined = (Array.isArray(filters[prop])
        ? filters[prop]
        : [filters[prop]]
      )
        .map((value: any) => {
          const stringified =
            typeof value === "string" ? `'${value}'` : `${value}`;
          return `${prop} eq ${stringified}`;
        })
        .join(" or ");
      return joined ? `(${joined})` : "";
    })
    .filter(f => f.length > 0)
    .join(" and ");
  return filter ? `$filter=${filter}` : "";
}

export function ntlmRequest<Req, Res>(
  options: NavRequest<Req>
): Promise<NavResponse<Res>> {
  const {
    resource,
    filter = {},
    username: domainUsername,
    password,
    method,
    body,
    headers
  } = options;
  const [domain, username] = domainUsername.split("\\");
  const query = ["$format=json", buildFilter(filter)]
    .filter(x => x && x.length > 0)
    .join("&");
  const url = `${process.env.NAV_BASE_URL}/${resource}?${query}`;
  console.log(`NAV PROXY ${url}`);
  return new Promise((resolve, reject) =>
    request.method(
      method,
      {
        url,
        domain,
        username,
        password,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "content-type": "application/json",
          ...headers
        }
      },
      (err, result) => {
        if (err) reject(err);
        else {
          if (result.statusCode >= 200 && result.statusCode < 300) {
            let body;
            try {
              body = result.body ? JSON.parse(result.body) : undefined;
            } catch {
              reject(new NavError(options, result));
            }
            resolve({
              ...result,
              body
            });
          } else {
            reject(new NavError(options, result));
          }
        }
      }
    )
  );
}

export default {
  get<Res = string>(options: NavGetRequest): Promise<NavGetResponse<Res>> {
    return ntlmRequest({ ...options, method: "get" });
  },
  post<Res = string, Req = string>(
    options: NavPostRequest<Req>
  ): Promise<NavPostResponse<Res>> {
    return ntlmRequest({ ...options, method: "post" });
  }
};
