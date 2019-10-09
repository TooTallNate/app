import request from "httpntlm";

interface Request {
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

interface Response {
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
}: Request): Promise<Response> {
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

export interface NavCredentials {
  username: string;
  password: string;
}

export interface NavUser {
  License_Type: string;
  Full_Name: string;
}

export default {
  async getUser(
    username: string,
    { username: domainUsername, password }: NavCredentials
  ): Promise<NavUser | null> {
    const url = `${process.env.NAV_BASE_URL}/User?$filter=User_Name eq '${username}'&$select=Full_Name,License_Type`;
    const { body, statusCode } = await ntlmRequest({
      url,
      domainUsername,
      password,
      method: "get"
    });
    if (statusCode === 200 && body && body.value.length === 1) {
      return body.value[0];
    } else {
      return null;
    }
  }
};
