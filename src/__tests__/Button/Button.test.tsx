import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import Button from "../../components/Button/Button";

describe("Button Component", () => {
  test("It render correctly", () => {
    const { queryByText } = render(<Button text="Button" />);

    queryByText(/Button/);
  });

  test("Button with variants", () => {
    const { getByTestId } = render(<Button text="Button" testID="BUTTON" />);

    expect(getByTestId("BUTTON")).toHaveStyle({
      backgroundColor: "#FF0056",
    });
  });
});
