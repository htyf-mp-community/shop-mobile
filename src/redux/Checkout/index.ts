import { createSlice } from "@reduxjs/toolkit";

type TransactionStatus = "PREPARING" | "PENDING" | "FINISHED" | "FAILED";

const credentials = {
  name: "",
  surname: "",
  street: "",
  apartment_number: "",
  city: "",
  phone: "",
};

const initialState = {
  paymentResult: "",
  paymentError: "",
  paymentLoading: false,
  paymentIntentClientSecret: "",
  total: 0,
  status: "PREPARING" as TransactionStatus,
  ammountCharged: 0,

  credentials,
};

type State = typeof initialState;

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setSecret(state: State, { payload }: { payload: string }) {
      state.paymentIntentClientSecret = payload;
    },

    setTotal(state: State, { payload }: { payload: number }) {
      state.total = payload;
    },

    finishTransaction(state: State) {
      state.status = "FINISHED";

      state.paymentError = "";
      state.paymentLoading = false;
      state.paymentResult = "finished";
    },

    updateTransactionStatus(state: State) {
      if (state.status === "PREPARING") {
        state.status = "PENDING";
      } else if (state.status === "PENDING") {
        state.status = "FINISHED";
      }
    },

    setCharged(state: State, { payload }: { payload: number }) {
      state.ammountCharged = payload;
    },

    setCredentials(state: State, { payload }: { payload: typeof credentials }) {
      state.credentials = payload;
    },

    startTransaction(state: State) {
      state.paymentLoading = true;
    },
    failTransaction(state: State, { payload }: { payload: string }) {
      state.paymentLoading = false;
      state.paymentError = payload;
      state.status = "FAILED";
    },

    destroySession(state: State) {
      state = initialState;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
