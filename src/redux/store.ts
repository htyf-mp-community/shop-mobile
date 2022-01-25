import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Cart";
import { checkoutReducer } from "./Checkout";

const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
