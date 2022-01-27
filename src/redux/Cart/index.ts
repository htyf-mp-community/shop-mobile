import { createSlice } from "@reduxjs/toolkit";
import { ProductTypeProps } from "../../modules/Product/Product";

interface Cart extends ProductTypeProps {
  cart_id: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [] as Cart[],
    loading: false,
    error: "",
    empty: false,
  },
  reducers: {
    setCart(state, { payload }) {
      state.loading = false;
      state.cart = payload;
      state.error = "";
      if (state.cart.length > 0) state.empty = false;
    },
    setError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    startLoading(state) {
      state.loading = true;
    },

    incrementAmmount(state, { payload }) {
      state.cart = state.cart.map((prod) => {
        if (prod.prod_id === payload) {
          return { ...prod, ammount: prod.ammount + 1 };
        }
        return prod;
      });
    },

    removeById(state, { payload }: { payload: number }) {
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
