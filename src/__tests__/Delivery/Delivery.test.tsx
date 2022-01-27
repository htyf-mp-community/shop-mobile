import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Delivery from "../../modules/Delivery";

jest.mock("../../modules/Delivery", () => () => "Delivery");

describe("Delivery", () => {
  test("It renders", () => {
    const { queryByText } = render(<Delivery />);

    queryByText(/24h/);
  });
});
