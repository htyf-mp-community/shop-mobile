import { createSlice } from "@reduxjs/toolkit";
import { ProductTypeProps } from "modules/Product";

interface Cart extends ProductTypeProps {
  cart_id: number;
  ammount: number;
}
const initialState = {
  cart: [] as Cart[],
  loading: false,
  error: "",
  empty: false,
  amount: 0,
};

type State = typeof initialState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state: State, { payload }: { payload: any[] }) {
      state.loading = false;
      state.cart = payload;
      state.error = "";

      state.amount = payload.length;
      if (state.cart.length > 0) state.empty = false;
    },
    setError(state: State, { payload }: { payload: string }) {
      state.loading = false;
      state.error = payload;
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
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;
