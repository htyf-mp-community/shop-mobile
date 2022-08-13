import { createSlice } from "@reduxjs/toolkit";
import { Paging, ProductMinified } from "/@types/types";

export interface Cart extends ProductMinified {
  cart_id: number;
  ammount: number;
}
const initialState = {
  cart: [] as Cart[],
  loading: false,
  error: "",
  empty: false,
  amount: 0,
  isSynced: false,

  hasMore: false,
};

type State = typeof initialState;

const amount = (list: Cart[]): number =>
  list.reduce((prev, { ammount }) => prev + ammount, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart(state: State) {
      state.error = "";
      state.amount = 0;
      state.cart = [];
      state.hasMore = false;
    },

    setCart(state: State, { payload }: { payload: Paging<Cart> }) {
      state.loading = false;
      if (!state.isSynced) {
        state.cart = payload.results;
      } else {
        state.cart = [...state.cart, ...payload.results];
      }
      state.error = "";
      state.isSynced = true;
      state.amount = amount(state.cart);
      state.hasMore = payload.hasMore;

      if (state.cart.length > 0) state.empty = false;
    },
    setError(state: State, { payload }: { payload: string }) {
      state.loading = false;
      state.error = payload;
    },

    appendCart(state: State, { payload }: { payload: Cart }) {
      const index = state.cart.findIndex(
        (element) => element.prod_id === payload.prod_id
      );

      const copy = [...state.cart];

      if (index !== -1) {
        copy[index] = payload;

        state.cart = copy;
      } else {
        copy.push(payload);

        state.cart = copy;
      }
      state.amount = amount(copy);
    },

    startLoading(state: State) {
      state.loading = true;
    },

    increment(state: State) {
      state.amount += 1;
    },

    incrementAmmount(state: State, { payload }: { payload: number }) {
      state.cart = state.cart.map((prod) => {
        if (prod.prod_id === payload) {
          return { ...prod, ammount: prod.ammount + 1 };
        }
        return prod;
      });
    },

    removeById(state: State, { payload }: { payload: number }) {
      const cart = [];

      for (const product of state.cart) {
        if (product.cart_id === payload && product.ammount > 1) {
          cart.push({ ...product, ammount: product.ammount - 1 });
        } else if (product.cart_id !== payload) {
          cart.push(product);
        } else if (product.cart_id === payload && product.ammount === 1) {
          continue;
        }
      }

      state.cart = cart;
      state.amount = amount(cart);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;
