import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Cart";
import { checkoutReducer } from "./Checkout";
import { userReducers } from "./User";

const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    cart: cartReducer,
    user: userReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
