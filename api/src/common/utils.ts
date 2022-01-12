import { format } from "date-fns";

export function getDocumentNumber(form: string, username: string) {
  const name = username.slice(0, 8 - form.length);
  const date = format(new Date(), "yyMMddHHmmss");
  return `${form}${name}${date}`;
}

export function navDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function parseNavDate(dateStr: string) {
  const parts = dateStr.split("-");
  return new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2])
  );
}

export function getDateFromWeekNumber(w: number, y: number) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

export enum ErrorCode {
  Unauthorized = "UNAUTHORIZED",
  Unauthenticated = "UNAUTHENTICATED",
  InvalidCredentials = "INVALID_CREDENTIALS",
  NoAvailableLicense = "NO_AVAILABLE_LICENSE",
  Unknown = "UNKNOWN_ERROR"
}

export const MenuOptions = [
  { Name: "Livestock Activity", Route: "/livestock-activity" },
  { Name: "Scorecards", Route: "/scorecard" },
  { Name: "Fuel", Route: "/fuel" },
  { Name: "Maintenance", Route: "/maintenance" },
  { Name: "Inventory Consumption", Route: "/inventory" }
];
