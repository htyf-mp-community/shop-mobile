import RemoveProductsRepetition from "../functions/RemoveRepetition";

test("Removes duplicate based on product id ", () => {
  const testData = [{ prod_id: 1 }, { prod_id: 2 }, { prod_id: 1 }];

  expect(RemoveProductsRepetition(testData)).toStrictEqual([
    { prod_id: 1 },
    { prod_id: 2 },
  ]);
  expect(RemoveProductsRepetition([])).toStrictEqual([]);
});
