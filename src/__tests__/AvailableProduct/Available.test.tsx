import React from "react";
import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Available from "../../components/AvailableProduct/index";

jest.mock("@react-native-async-storage/async-storage", () => ({
  AsyncStorageLib: jest.fn(),
}));

describe("Available Component", () => {
  test("It has green color AND text if product is in stock", async () => {
    const { getByTestId, getByText } = render(<Available quantity={10} />);

    getByText(/Available/i);
    expect(getByTestId("STATUS.INDICATOR")).toHaveStyle({
      backgroundColor: "green",
    });

    expect(getByTestId("TEXT.STATUS")).toHaveStyle({
      color: "#fff",
    });
  });
  test("It has red color AND text if product is OUT of stock", () => {
    const { getByTestId, getByText } = render(<Available quantity={0} />);

    getByText(/Not Available/i);
    expect(getByTestId("STATUS.INDICATOR")).toHaveStyle({
      backgroundColor: "red",
    });
    expect(getByTestId("TEXT.STATUS")).toHaveStyle({
      color: "red",
    });
  });
});
