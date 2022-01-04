import { render } from "@testing-library/react-native";

import React from "react";
import Button from "../components/Button/Button";

describe("Button works", () => {
  test("Button works correctly", () => {
    const { queryByText } = render(
      <Button callback={() => {}} text="Click Me" />
    );

    queryByText(/Click Me/);
  });
});
