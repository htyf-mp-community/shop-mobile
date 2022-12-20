import React from "react";
import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Button from "../../components/ui/Button/Button";

describe("Button Component", () => {
  test("It render correctly", () => {
    const { getByText } = render(<Button text="Button" />);

    getByText(/Button/);
  });

  test("Button with variants", () => {
    const { getByTestId } = render(
      <Button variant="primary" text="Button" testID="BUTTON" />
    );

    expect(getByTestId("BUTTON")).toHaveStyle({
      backgroundColor: "#FF0056",
    });
  });
});
