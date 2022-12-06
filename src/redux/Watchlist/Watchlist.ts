import { createSlice } from "@reduxjs/toolkit";
import RemoveProductsRepetition from "functions/RemoveRepetition";
import { addProduct, checkElementStatus, removeProduct } from "./httpThunk";
import { Paging, ProductMinified } from "/@types/types";

const initialState = {
  loading: true,
  error: "",
  data: [] as ProductMinified[],
  hasMore: false,
  amount: 0,

  isSynced: false,
};

type State = typeof initialState;

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    increment(state: State) {
      state.amount += 1;
    },
    setWatchlist(
      state: State,
      { payload }: { payload: Paging<ProductMinified> }
    ) {
      state.loading = false;

      console.log(payload.results.length, payload.hasMore);

      if (state.isSynced) {
        state.data = RemoveProductsRepetition(
          [...state.data, ...payload.results],
          "prod_id"
        );
      } else {
        state.data = payload.results;
      }
      state.error = "";
      state.hasMore = payload.hasMore;
      state.amount = state.data.length;

      state.isSynced = true;
    },

    updateWatchlist(state: State, { payload }: any) {
      state.data = [...state.data, payload as ProductMinified];
      state.amount += 1;
    },

    removeElement(state: State, { payload }: { payload: number }) {
      state.data = state.data.filter(({ prod_id }) => prod_id !== payload);
      state.amount = state.data.length;
    },

    clearWatchlist(state: State) {
      state = initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.data = [...state.data, payload as ProductMinified];
      state.amount += 1;
    });
    builder.addCase(removeProduct.fulfilled, (state, { payload }) => {
      state.data = state.data.filter(({ prod_id }) => prod_id !== payload);
      state.amount = state.data.length;
    });
  },
});

export const watchlistReducers = watchlistSlice.reducer;
export const watchlistActions = watchlistSlice.actions;
