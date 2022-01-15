import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    paymentResult: "",
    paymentError: "",
    paymentLoading: false,
    paymentIntentClientSecret: "",
  },
  reducers: {
    toggleLoading(state) {
      state.paymentLoading = !state.paymentLoading;
    },
    setError(state, { payload }: { payload: string }) {
      state.paymentError = payload;
    },
    setSecret(state, { payload }: { payload: string }) {
      state.paymentIntentClientSecret = payload;
    },
    setResult(state, { payload }: { payload: string }) {
      state.paymentResult = payload;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
