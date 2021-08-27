import { CalcTotalCartPrice } from "../functions/CalcTotalCartPrice";

test("Calculate total price of item in the cart based on price and ammount", () => {
  const first = [
    { price: 1000, ammount: 2 },
    { price: 50, ammount: 10 },
  ];

  expect(CalcTotalCartPrice(first)).toBe(2500);
  expect(CalcTotalCartPrice([])).toBe(0);
});
