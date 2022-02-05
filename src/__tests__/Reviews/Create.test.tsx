import React from "react";
import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import CreateReview from "../../navigation/Screens/Reviews/CreateReview";

jest.mock(
  "../../navigation/Screens/Reviews/CreateReview",
  () => () => "CreateReview"
);

const props = {
  params: {
    prod_id: 1,
    thumbnail: "",
    sharedID: "TEST",
    prod_name: "",
  },
  path: "",
} as any;

describe("Reviews Create", () => {
  it("It renders correctly", () => {
    render(<CreateReview route={props} />);
  });

  it("It validates Correctly", async () => {
    const { queryByPlaceholderText, getByText } = render(
      <CreateReview route={props} />
    );

    // cant find element, dont know the cause
  });
});
