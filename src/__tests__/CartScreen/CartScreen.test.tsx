import "@testing-library/jest-native/extend-expect";
import { render, waitFor } from "@testing-library/react-native";
import Cart from "../../navigation/Screens/Cart/index";
jest.mock("../../navigation/Screens/Cart/index", () => () => "Cart");

describe("Cart Screen", () => {
  it("Adds element on click", async () => {
    const { getByText } = render(<Cart />);
  });
});
