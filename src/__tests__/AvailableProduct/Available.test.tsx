import "@testing-library/jest-native/extend-expect";
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Available from "../../components/AvailableProduct/index";

describe("Available Component", () => {
  test("It has green color if product is in stock", async () => {
    const { queryByText } = render(<Available quantity={10} />);

    queryByText(/Available/);
  });
});
