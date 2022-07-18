import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Cart";
import { checkoutReducer } from "./Checkout";
import { userReducers } from "./User";
import { watchlistReducers } from "./Watchlist/Watchlist";
import { cacheReducer } from "./Cache/Cache";

const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    cart: cartReducer,
    user: userReducers,
    watchlist: watchlistReducers,
    cache: cacheReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
