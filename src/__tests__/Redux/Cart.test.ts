import store from "../../redux/store";
import { cartActions } from "../../redux/Cart/index";

const cart = [
  { prod_id: 1, cart_id: 1, ammount: 1 },
  { prod_id: 2, cart_id: 2, ammount: 1 },
  { prod_id: 3, cart_id: 3, ammount: 1 },
] as any[];

describe("Cart Reducer", () => {
  test("should set cart", () => {
    let state = store.getState().cart;

    store.dispatch(
      cartActions.setCart({
        hasMore: false,
        results: cart,
      })
    );

    state = store.getState().cart;

    expect(state.cart.length).toBe(3);
    expect(state.amount).toBe(3);
  });

  test("should clear cart", () => {
    let state = store.getState().cart;

    store.dispatch(cartActions.clearCart());

    state = store.getState().cart;

    expect(state.cart.length).toBe(0);
    expect(state.amount).toBe(0);
  });

  test("should increment cart", () => {
    let state = store.getState().cart;

    store.dispatch(cartActions.increment());

    state = store.getState().cart;

    expect(state.amount).toBe(1);
  });

  test("Should add product to cart OR increment prod's amount", () => {
    let state = store.getState().cart;

    store.dispatch(
      cartActions.setCart({
        hasMore: false,
        results: cart,
      })
    );

    store.dispatch(
      cartActions.appendCart({
        prod_id: 4,
        cart_id: 4,
        ammount: 1,
      } as any)
    );

    state = store.getState().cart;

    expect(state.cart.length).toBe(4);
    expect(state.amount).toBe(4);

    store.dispatch(
      cartActions.appendCart({ prod_id: 4, cart_id: 4, ammount: 2 } as any)
    );

    state = store.getState().cart;

    expect(state.cart.length).toBe(4);
    expect(state.amount).toBe(5);

    expect(state.cart.find((prod) => prod.prod_id === 4)!.ammount).toBe(2);
  });

  test("Remove product OR decrease amount", () => {
    let state = store.getState().cart;

    store.dispatch(
      cartActions.setCart({
        hasMore: false,
        results: cart,
      })
    );

    store.dispatch(cartActions.removeById(2));

    state = store.getState().cart;
    expect(state.cart.length).toBe(2);
    expect(state.amount).toBe(2);
    expect(state.cart).toStrictEqual([
      { prod_id: 1, cart_id: 1, ammount: 1 },
      { prod_id: 3, cart_id: 3, ammount: 1 },
    ]);
  });
});
