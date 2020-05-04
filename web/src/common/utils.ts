export function remToPx(n: number): number {
  return (
    n * parseFloat(getComputedStyle(document.documentElement).fontSize || "0")
  );
}
