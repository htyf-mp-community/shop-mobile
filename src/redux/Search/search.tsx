import { createSlice } from "@reduxjs/toolkit";

type Filter = {
  name: string;
  value: string;
};

const initialState = {
  filters: [] as Filter[],
  searchedText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setText(state, action) {
      state.searchedText = action.payload;
    },
    addFilter(state, action) {
      state.filters.push(action.payload);
    },

    removeFilter(state, action) {
      state.filters = state.filters.filter(
        (filter) => filter.name !== action.payload
      );
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
