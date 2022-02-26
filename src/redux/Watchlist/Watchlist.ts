import { createSlice } from "@reduxjs/toolkit";
import { ProductMinified } from "/@types/types";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    loading: true,
    error: "",
    data: [] as ProductMinified[],
    hasMore: false,
  },
  reducers: {
    setWatchlist(state, { payload }) {
      state.loading = false;
      state.data = payload.results;
      state.error = "";
      state.hasMore = payload.hasMore;
    },
    removeElement(state, { payload }) {
      state.data = state.data.filter(({ prod_id }) => prod_id !== payload);
    },
  },
});

export const watchlistReducers = watchlistSlice.reducer;
export const watchlistActions = watchlistSlice.actions;
