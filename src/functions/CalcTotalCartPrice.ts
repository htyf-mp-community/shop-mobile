/**
 * @param {Array} cart takes array of Objects containing Ammount & Price
 * @returns {Number} total sum of cart
 **/

export function CalcTotalCartPrice<
  T extends { ammount: number; price: number }
>(cart: T[]): number {
  const mapped = cart.map(({ ammount, price }) => ammount * price);

  return mapped.reduce((prev, curr) => prev + curr, 0);
}
