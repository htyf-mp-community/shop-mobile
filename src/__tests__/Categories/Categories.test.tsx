import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Categories from "../../modules/Categories";

jest.mock("../../modules/Categories", () => () => "Categories");

describe("Categories", () => {
  // fails
  test("It renders items", async () => {
    const { getAllByTestId } = render(<Categories />);

    expect(getAllByTestId("CATEGORY.ELEMENT").length).toEqual(2);
  });
});
