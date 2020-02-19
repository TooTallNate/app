import { format } from "date-fns";

export function getDocumentNumber(form: string, username: string) {
  const name = username.slice(0, 8 - form.length);
  const date = format(new Date(), "yyMMddHHmmss");
  return `${form}${name}${date}`;
}

export function navDate(date: Date) {
  return format(date, "YYY-MM-dd");
}

export enum ErrorCode {
  Unauthorized = "UNAUTHORIZED",
  InvalidCredentials = "INVALID_CREDENTIALS",
  NoAvailableLicense = "NO_AVAILABLE_LICENSE",
  Unknown = "UNKNOWN_ERROR"
}
