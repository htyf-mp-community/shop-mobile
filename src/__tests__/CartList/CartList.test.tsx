import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import CartList from "../../modules/CartList";

jest.mock("../../modules/CartList", () => () => "CartList");

const testingDataProps = [
  {
    prod_id: 1,
    ammount: 1,
    cart_id: 1,
    title: "aa",
    img_id: [],
    price: 100,
    discount_price: null,
    description: "",
    category: "",
    rating_id: [],
    expiration_date: "",
    manufacturer: "",
    vendor: {},
    quantity: 10,
  },
];

describe("CartList Module", () => {
  test("It renders Correctly", () => {
    const list = render(
      <CartList data={testingDataProps} updateCartState={jest.fn} />
    );
  });
});
