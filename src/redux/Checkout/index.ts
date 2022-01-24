import { createSlice } from "@reduxjs/toolkit";

type TransactionStatus = "PREPARING" | "PENDING" | "FINISHED" | "FAILED";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    paymentResult: "",
    paymentError: "",
    paymentLoading: false,
    paymentIntentClientSecret: "",

    status: "PREPARING" as TransactionStatus,
    ammountCharged: 0,
  },
  reducers: {
    setSecret(state, { payload }: { payload: string }) {
      state.paymentIntentClientSecret = payload;
    },

    updateTransactionStatus(state) {
      if (state.status === "PREPARING") {
        state.status = "PENDING";
      } else if (state.status === "PENDING") {
        state.status = "FINISHED";
      }
    },

    setCharged(state, { payload }) {
      state.ammountCharged = payload;
    },

    startTransaction(state) {
      state.paymentLoading = true;
    },
    failTransaction(state, { payload }) {
      state.paymentLoading = false;
      state.paymentError = payload;
      state.status = "FAILED";
    },

    destroySession(state) {
      state.ammountCharged = 0;
      state.paymentLoading = false;
      state.status = "PREPARING";
      state.paymentError = "";
      state.paymentIntentClientSecret = "";
      state.paymentResult = "";
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
