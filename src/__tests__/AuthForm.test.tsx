import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import AuthForm from "../modules/AuthForm/AuthForm";
import React from "react";

import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};

  return Reanimated;
});
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("It validates Form", () => {
  test("it renders correctly", () => {
    render(<AuthForm header="LOGIN" onSubmit={() => {}} error="" />);
  });

  test("shows invalid message if values are incorrect", async () => {
    const { getByPlaceholderText, queryByText, queryByTestId } = render(
      <AuthForm header="LOGIN" onSubmit={() => {}} error="" />
    );

    act(() => {
      fireEvent.changeText(getByPlaceholderText("Email"), "aa");
      fireEvent.changeText(getByPlaceholderText("password"), "aa");
    });

    await waitFor(() => {
      queryByText(/Must be at least 6 characters/);
      queryByText(/Please enter valid email/);
      expect(queryByTestId("SUBMIT_BUTTON")).toBeDisabled();
    });
  });

  test("it handles validation successfully then changes screen", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, queryByText, queryByTestId, getByText } =
      render(<AuthForm header="LOGIN" onSubmit={onSubmit} error="" />);

    act(() => {
      fireEvent.changeText(
        getByPlaceholderText("Email"),
        "testingemail@gmail.com"
      );
      fireEvent.changeText(
        getByPlaceholderText("password"),
        "atleast6characters"
      );
    });

    await waitFor(() => {
      getByText(/Email/);
      getByText(/Password/);
    });
  });
});
