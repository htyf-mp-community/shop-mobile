import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Filter = {
  name: string;
  value: string;
};

type History = {};

const initialState = {
  filters: {
    category: "",
    price: {
      min: 0,
      max: 0,
    },
    sorting: "",
  },
  searchHistory: [] as History[],
  searchedText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setText(state, action) {
      state.searchedText = action.payload;
    },
    setFilter<T extends keyof typeof initialState.filters>(
      state: typeof initialState,
      action: PayloadAction<{
        key: T;
        value: typeof initialState.filters[T];
      }>
    ) {
      state.filters[action.payload.key] = action.payload.value;
    },

    clearAllFilters(state) {
      state.filters = initialState.filters;
    },

    clearFilter<T extends keyof typeof initialState.filters>(
      state: typeof initialState,
      action: {
        payload: T;
      }
    ) {
      state.filters[action.payload] = initialState.filters[action.payload];
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
