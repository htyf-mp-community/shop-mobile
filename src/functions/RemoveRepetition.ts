/**
 * @param {Array} arr takes Array of any objects with key prod_id
 * @returns {Array} Same type array without repetiton based on prod_id key
 **/

export default function RemoveProductsRepetition(
  arr: any[],
  key_id: string
): any[] {
  return Array.from(new Set(arr.map((a) => a[key_id]))).map((id) => {
    return arr.find((a) => a[key_id] === id);
  });
}
