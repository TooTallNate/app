import request from "httpntlm";

export interface Filter {
  [prop: string]: any[] | any;
}

export interface NavRequest {
  resource: string;
  filter?: Filter;
  username: string;
  password: string;
  method: string;
  body?: {
    [key: string]: any;
  };
  headers?: {
    [header: string]: string;
  };
}

export interface NavResponse {
  statusCode: number;
  body?: {
    [key: string]: any;
  };
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

export default function ntlmRequest({
  resource,
  filter,
  username: domainUsername,
  password,
  method,
  body,
  headers
}: NavRequest): Promise<NavResponse> {
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
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
          ...headers
        }
      },
      (err, result) => {
        if (err) reject(err);
        else {
          resolve({
            ...result,
            body: result.body ? JSON.parse(result.body) : undefined
          });
        }
      }
    )
  );
}
