import React from "react";
import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Categories from "../../modules/Categories";

jest.mock("@react-navigation/core", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("@utils/hooks/useFetch", () => {
  return jest.fn(() => ({ data: ["Electronic", "Food"] }));
});

describe("Categories", () => {
  test("It renders items", async () => {
    const { getByText } = render(<Categories />);

    await getByText("Electronic");
    getByText("Food");
  });

  test("Element should not be found in list", async () => {
    const { queryAllByText } = render(<Categories />);

    expect(queryAllByText("Doesnt exits").length).toEqual(0);
  });
});
