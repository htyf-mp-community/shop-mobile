export function transformInto2DimsArray<T extends {}>(inputArray: T[]) {
  const outputArray: T[][] = [];

  let i = 0;
  while (inputArray.length > i) {
    if (i % 3 === 0 && !!inputArray[i + 1]) {
      outputArray.push([inputArray[i], inputArray[i + 1]]);
      i += 2;
    } else {
      outputArray.push([inputArray[i]]);
      i++;
    }
  }

  return outputArray;
}
