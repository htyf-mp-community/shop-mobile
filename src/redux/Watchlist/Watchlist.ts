import { createSlice } from "@reduxjs/toolkit";
import { ProductMinified } from "/@types/types";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    loading: true,
    error: "",
    data: [] as ProductMinified[],
    hasMore: false,
    amount: 0,
  },
  reducers: {
    increment(state) {
      state.amount += 1;
    },
    setWatchlist(state, { payload }) {
      state.loading = false;
      state.data = payload.results;
      state.error = "";
      state.hasMore = payload.hasMore;
      state.amount = payload.results.length;
    },
    removeElement(state, { payload }) {
      state.data = state.data.filter(({ prod_id }) => prod_id !== payload);
      state.amount = state.data.length;
    },
  },
});

export const watchlistReducers = watchlistSlice.reducer;
export const watchlistActions = watchlistSlice.actions;
