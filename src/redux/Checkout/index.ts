import { createSlice } from "@reduxjs/toolkit";
import { createPayment, createPaymentIntent } from "./HttpService";
import { initialState, TransactionStatus } from "./constants";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveCredentials(state, { payload }) {
      state.credentials = payload;
    },

    destroySession(state) {
      state = initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.paymentIntentClientSecretLoading = true;
    });

    builder.addCase(createPaymentIntent.fulfilled, (state, { payload }) => {
      state.paymentIntentClientSecret = payload.clientSecret;
      state.total = payload.total;
      state.paymentLoading = false;

      state.paymentIntentClientSecretLoading = false;
    });

    builder.addCase(createPaymentIntent.rejected, (state) => {
      state.paymentError = "Error creating payment intent";
      state.paymentLoading = false;
      state.status = TransactionStatus.FAILED;
    });

    builder.addCase(createPayment.pending, (state) => {
      state.paymentLoading = true;

      if (state.status === "PREPARING") {
        state.status = TransactionStatus.PENDING;
      } else if (state.status === "PENDING") {
        state.status = TransactionStatus.FINISHED;
      }
    });

    builder.addCase(createPayment.fulfilled, (state, { payload }) => {
      state.ammountCharged = payload.paymentIntent.amount;
      state.status = TransactionStatus.FINISHED;
      state.paymentError = "";
      state.paymentLoading = false;
      state.paymentResult = "finished";
    });

    builder.addCase(createPayment.rejected, (state, { payload }) => {
      state.paymentError = payload as string;
      state.status = TransactionStatus.FAILED;
      state.paymentLoading = false;
    });
  },
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
