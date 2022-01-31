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

    store.dispatch(
      cartActions.setCart([
        { cart_id: 1, ammount: 1 },
        { cart_id: 2, ammount: 2 },
      ])
    );
    state = store.getState().cart;
    expect(state.cart.length).toBe(2);

    store.dispatch(cartActions.removeById(1));

    state = store.getState().cart;

    expect(state.cart.length).toBe(1);

    store.dispatch(cartActions.removeById(2));
    state = store.getState().cart;

    expect(state.cart[0]).toEqual({
      cart_id: 2,
      ammount: 1,
    });
  });

  test("It increments ammount of product", () => {
    let state = store.getState().cart;

    store.dispatch(cartActions.setCart([{ prod_id: 1, ammount: 1 }]));

    state = store.getState().cart;

    expect(state.cart.length).toBe(1);

    store.dispatch(cartActions.incrementAmmount(1));

    state = store.getState().cart;

    expect(state.cart[0]).toEqual({
      prod_id: 1,
      ammount: 2,
    });
  });
});
