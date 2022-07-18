import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import { Colors } from "constants/styles";
import Purchase from "navigation/Screens/Cart/Purchase/Purchase";

jest.mock("@react-native-async-storage/async-storage", () => ({
  AsyncStorageLib: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("Purchase module", () => {
  test("Button is disabled if cart empty", () => {
    const { getByTestId } = render(<Purchase cart={[]} />);

    expect(getByTestId("PURCHASE.BUTTON")).toBeDisabled();
  });
  test("Button is NOT disabled if cart NOT empty", () => {
    const { getByTestId } = render(
      <Purchase
        cart={[
          //@ts-ignore
          {
            ammount: 1,
            price: 200,
          },
        ]}
      />
    );

    const btn = getByTestId("PURCHASE.BUTTON");

    expect(btn).toHaveTextContent(/200/gi);
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveStyle({
      backgroundColor: Colors.secondary,
    });
  });
});
