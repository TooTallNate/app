export function getDocumentNumber(form: string, username: string) {
  const name = username.slice(0, 6);
  const date = formatDate(new Date(), "YYMMDD");
  return `${form}-${name}-${date}`;
}

export function formatDate(date: Date, format: string) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const _date = date.getDate().toString();
  return [
    ["YYYY", year],
    ["YY", year.slice(-2)],
    ["MM", month.padStart(2, "0")],
    ["M", month],
    ["DD", _date.padStart(2, "0")],
    ["D", _date]
  ].reduce((str, [key, value]) => str.replace(key, value), format);
}

export function remToPx(n: number): number {
  return (
    n * parseFloat(getComputedStyle(document.documentElement).fontSize || "0")
  );
}

export function setRef<T>(
  source: T | null,
  ref: ((instance: T | null) => void) | React.RefObject<T | null> | null
): void {
  if (typeof ref === "function") {
    ref(source);
  } else if (ref) {
    // @ts-ignore since current is readonly for some reason.
    ref.current = source;
  }
}
