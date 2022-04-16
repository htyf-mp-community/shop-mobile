import React from "react";
import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Delivery from "../../modules/Delivery";

describe("Delivery", () => {
  test("It renders", () => {
    const { getByText } = render(<Delivery />);

    getByText("24h");
  });
});
