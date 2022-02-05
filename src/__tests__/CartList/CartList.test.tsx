import React from "react";
import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import CartList from "../../modules/CartList";

jest.mock("../../modules/CartList", () => () => "CartList");

const testingDataProps = [
  {
    prod_id: 1,
    ammount: 1,
    cart_id: 1,
    img_id: [],
    price: 100,
    quantity: 10,
  },
  {
    prod_id: 2,
    ammount: 1,
    cart_id: 2,
    img_id: [],
    price: 100,
    quantity: 10,
  },
];

const event = {
  nativeEvent: {
    contentOffset: {
      x: 0,
      y: 250,
    },
    contentSize: {
      height: 885,
      width: 328,
    },
    layoutMeasurement: {
      height: 469,
      width: 328,
    },
  },
};

const TESTID = "CART.ELEMENT";

describe("CartList Module", () => {
  it("It renders Correctly", async () => {});
});
