import store from "../../redux/store";
import { cartActions } from "../../redux/Cart/index";

describe("Test Cart", () => {
  test("It adds product to cart", () => {
    let state = store.getState().cart;

    const product = [{ prod_id: 1 }, { prod_id: 2 }];

    store.dispatch(cartActions.setCart(product));
    state = store.getState().cart;

    expect(state.cart.length).toEqual(2);
  });

  test("It removes element by id", () => {
    let state = store.getState().cart;
    const product = [
      { prod_id: 1, ammount: 1 },
      { prod_id: 2, ammount: 2 },
    ];
    store.dispatch(cartActions.setCart(product));
    state = store.getState().cart;
    expect(state.cart.length).toEqual(2);
    store.dispatch(cartActions.removeById(2));

    state = store.getState().cart;

    expect(state.cart.length).toEqual(2);
  });
});
