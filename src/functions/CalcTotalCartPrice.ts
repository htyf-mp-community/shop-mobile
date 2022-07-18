export function CalcTotalCartPrice<
  T extends { ammount: number; price: number }
>(cart: T[]): number {
  return cart
    .map(({ ammount, price }) => ammount * price)
    .reduce((prev, curr) => prev + curr, 0);
}
