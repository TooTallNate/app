import request from "httpntlm";

interface NTLMRequest {
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

interface NTLMResponse {
  statusCode: number;
  body?: {
    [key: string]: any;
  };
}

// Make a request to a NAV server using NTLM.
export function ntlmRequest({
  url,
  domainUsername,
  password,
  method,
  body,
  headers
}: NTLMRequest): Promise<NTLMResponse> {
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
        headers
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

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function getUser(username: string, password: string) {
  // Get the user info from NAV. If we succeed, the user is logged in.
  const url = `${process.env.NAV_BASE_URL}/User?$filter=User_Name eq '${username}'&$select=Full_Name,License_Type`;
  const { body, statusCode } = await ntlmRequest({
    url,
    domainUsername: username,
    password,
    method: "get"
  });
  if (statusCode === 200 && body && body.value.length === 1) {
    return { ...body.value[0] };
  } else {
    throw new HttpError(401, "Login failed");
  }
}
