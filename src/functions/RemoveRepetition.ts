/**
 * @param {Array} arr takes Array of any objects with key prod_id
 * @returns {Array} Same type array without repetiton based on prod_id key
 **/

export default function RemoveProductsRepetition(arr: any[]): any[] {
  return Array.from(new Set(arr.map((a) => a.prod_id))).map((id) => {
    return arr.find((a) => a.prod_id === id);
  });
}
