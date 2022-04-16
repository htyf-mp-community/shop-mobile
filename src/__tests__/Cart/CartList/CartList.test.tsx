import React from "react";
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import CartList from "../../../modules/CartList";

jest.mock("@react-native-async-storage/async-storage", () => ({
  AsyncStorageLib: jest.fn(),
}));

jest.mock("@modules/CartList/useCartDelete.ts", () => {
  return jest.fn(() => () => {});
});

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

const testingDataProps = [
  {
    prod_id: 1,
    ammount: 1,
    cart_id: 1,
    img_id: [],
    price: 100,
    quantity: 10,
    title: "test",
  },
  {
    prod_id: 2,
    ammount: 1,
    cart_id: 2,
    img_id: [],
    price: 100,
    quantity: 10,
    title: "test",
  },
];

const TESTID = "CART.ELEMENT";

describe("CartList Module", () => {
  it("It renders Correctly", async () => {
    const { getAllByTestId } = render(
      <CartList updateCartState={jest.fn} data={testingDataProps} />
    );

    expect(getAllByTestId(TESTID).length).toEqual(2);
  });

  it("It Shows amount", async () => {
    const { getAllByTestId, getByTestId } = render(
      <CartList updateCartState={jest.fn} data={testingDataProps} />
    );

    expect(getAllByTestId(TESTID).length).toEqual(2);
    expect(getByTestId("CART.ELEMENT.1")).toHaveTextContent("1");
    expect(getByTestId("CART.ELEMENT.2")).toHaveTextContent("1");
  });
});
