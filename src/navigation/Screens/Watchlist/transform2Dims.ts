export function transformInto2DimsArray<T extends {}>(inputArray: T[]): T[][] {
  const outputArray = [];
  for (let i = 0; i < inputArray.length; i += 2) {
    outputArray.push(inputArray.slice(i, i + 2));
  }
  return outputArray;
}
