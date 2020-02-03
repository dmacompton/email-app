export function timestampToDate(
  timestamp: string | number,
  full: boolean = false
): string {
  const date = new Date(timestamp).toLocaleDateString("uk");
  if (!full) return date;
  const time = new Date(timestamp).toLocaleTimeString("uk");
  return `${time} ${date}`;
}

export function sliceString(str: string, limit: number) {
  return `${str.slice(0, limit)}${str.length > limit ? "…" : ""}`;
}
