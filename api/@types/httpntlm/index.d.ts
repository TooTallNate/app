declare module "httpntlm" {
  interface NtlmRequest {
    url: string;
    domain: string;
    username: string;
    lm_password: Buffer;
    nt_password: Buffer;
    body?: string;
    headers?: {
      [header: string]: string;
    };
  }

  interface NtlmResponse {
    statusCode: number;
    body?: string;
  }

  interface NtlmCallback {
    (err: Error, res: NtlmResponse): void;
  }

  interface Ntlm {
    create_LM_hashed_password(password: string): Buffer;
    create_NT_hashed_password(password: string): Buffer;
  }

  export function method(
    method: string,
    options: NtlmRequest,
    callback: NtlmCallback
  ): Promise<NtlmResponse>;

  export const ntlm: Ntlm;
}
