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
