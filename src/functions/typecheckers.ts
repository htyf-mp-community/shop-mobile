export function notUndefined(v: any): boolean {
  return typeof v !== "undefined";
}

export function notEmpty(arr: any[]): boolean {
  return arr.length > 0;
}
