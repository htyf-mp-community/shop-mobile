import { createSlice } from "@reduxjs/toolkit";

interface CacheProps {
  time: number;
  key: string;
  data: any;
}

const CacheSlice = createSlice({
  name: "cache",
  initialState: {
    keys: [] as CacheProps[],
  },
  reducers: {
    setKeys: (state, { payload }) => {
      state.keys = payload;
    },
    appendKey: (state, { payload }) => {
      state.keys = [
        ...state.keys,
        { time: Date.now(), key: payload.key, data: payload.data },
      ];
    },
  },
});

export const cacheActions = CacheSlice.actions;
export const cacheReducers = CacheSlice.reducer;
