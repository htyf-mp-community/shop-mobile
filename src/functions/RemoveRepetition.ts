/**
 * @param {Array} arr takes Array of any objects with key prod_id
 * @returns {Array} Same type array without repetiton based on prod_id key
 **/

export default function removeDuplicatesById(arr: any[], key: string) {
  const uniqueMap: any = {};
  const result = [];

  for (let obj of arr) {
    const id = obj[key];
    if (!uniqueMap[id]) {
      uniqueMap[id] = true;
      result.push(obj);
    }
  }
  return result;
}
