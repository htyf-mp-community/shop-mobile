/**
 * @param {Array} cart takes array of Objects containing Ammount & Price
 * @returns {Number} total sum of cart
 **/

export function CalcTotalCartPrice(cart: any[]): number {
  const PriceAndAmmountList = cart.map(({ ammount, price }) => ammount * price);
  let total = 0;
  for (let i = 0; i < PriceAndAmmountList.length; i++) {
    total += PriceAndAmmountList[i];
  }
  return total;
}
