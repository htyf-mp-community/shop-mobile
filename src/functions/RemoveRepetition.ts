export default function RemoveProductsRepetition(arr: any[]): any[] {
  return Array.from(new Set(arr.map((a) => a.prod_id))).map((id) => {
    return arr.find((a) => a.prod_id === id);
  });
}
