import { format } from "date-fns";

export function remToPx(n: number): number {
  return (
    n * parseFloat(getComputedStyle(document.documentElement).fontSize || "0")
  );
}

export function dateInputDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
