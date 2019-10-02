declare module "httpntlm" {
  interface NTLMRequest {
    url: string;
    domain: string;
    username: string;
    password: string;
    body?: string;
    headers?: {
      [header: string]: string;
    };
  }

  interface NTLMResponse {
    statusCode: number;
    body?: string;
  }

  interface NTLMCallback {
    (err: Error, res: NTLMResponse): void;
  }

  export function method(
    method: string,
    options: NTLMRequest,
    callback: NTLMCallback
  );
}
