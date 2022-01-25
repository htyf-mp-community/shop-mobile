export function sortImages(arr: { id: number; name: string }[]) {
  return [...arr].sort(({ id: id1 }, { id: id2 }) => id1 + id2);
}
