import React from "react";
import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Input from "../../components/ui/Input/Input";

describe("Input test", () => {
  test("Shows error message", () => {
    const { getByPlaceholderText, getByText } = render(
      <Input
        placeholder="input"
        helperText="Something went wrong"
        value=""
        error={true}
      />
    );

    expect(getByPlaceholderText("input")).toHaveStyle({
      borderColor: "#ff3030",
    });

    expect(getByText(/Something went wrong/i)).toBeTruthy();
  });
});
