import { format } from "date-fns";

export function remToPx(n: number): number {
  return (
    n * parseFloat(getComputedStyle(document.documentElement).fontSize || "0")
  );
}

export function formInputDate(d: string): string {
  const [yyyy, mm, dd] = d.split("-");
  if (d && mm && dd && yyyy) return `${mm}/${dd}/${yyyy}`;
  else return "";
}

export function dateInputDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function UrlParseFromQR(url: string): string {
  let relativeUrl = "";
  if (!url) throw new Error("Unable to find text value in QR code.");
  try {
    const split = url.split(".com")[1];
    if (split) relativeUrl = split;
  } catch {
    throw new Error("Unable to find relative URL in QR code.");
  }
  return relativeUrl;
}
