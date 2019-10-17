import request from "httpntlm";

export interface NavRequest {
  url: string;
  domainUsername: string;
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

export default function ntlmRequest({
  url,
  domainUsername,
  password,
  method,
  body,
  headers
}: NavRequest): Promise<NavResponse> {
  console.log(`NAV PROXY ${url}`);
  const [domain, username] = domainUsername.split("\\");
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
