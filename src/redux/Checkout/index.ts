import { createSlice } from "@reduxjs/toolkit";
import { createPayment, createPaymentIntent } from "./HttpService";
import { initialState } from "./constants";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createPaymentIntent.fulfilled, (state, { payload }) => {
      state.paymentIntentClientSecret = payload.clientSecret;
      state.total = payload.total;
      state.paymentLoading = false;
    });

    builder.addCase(createPaymentIntent.rejected, (state) => {
      state.paymentError = "Error creating payment intent";
      state.paymentLoading = false;
      state.status = "FAILED";
    });

    builder.addCase(createPayment.pending, (state) => {
      state.paymentLoading = true;

      if (state.status === "PREPARING") {
        state.status = "PENDING";
      } else if (state.status === "PENDING") {
        state.status = "FINISHED";
      }
    });

    builder.addCase(createPayment.fulfilled, (state, { payload }) => {
      state.ammountCharged = payload.paymentIntent.amount;
      state.status = "FINISHED";
      state.paymentError = "";
      state.paymentLoading = false;
      state.paymentResult = "finished";
    });

    builder.addCase(createPayment.rejected, (state, { payload }) => {
      state.paymentError = payload as string;
      state.status = "FAILED";
      state.paymentLoading = false;
    });
  },
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
