import { createAsyncThunk } from "@reduxjs/toolkit";
// import { confirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { API } from "constants/routes";
import { RootState } from "redux/store";

interface PaymentIntent {
  clientSecret: string;
  total: number;

  error?: string;
}

interface PaymentIntentArgs {
  token: string;
}

export const createPaymentIntent = createAsyncThunk<
  PaymentIntent,
  PaymentIntentArgs
>("checkout/createPaymentIntent", async ({ token }, api) => {
  try {
    const { data } = await axios.post<PaymentIntent>(
      `${API}/payments/create-payment-intent`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));

    return { clientSecret: "", total: 0, error: "Intent failed" };
  }
});

interface Payment {
  error: any;
  paymentIntent: any;
}

export const createPayment = createAsyncThunk<Payment>(
  "checkout/createPayment",
  async (_, api) => {
    const state = api.getState() as RootState;
    const credentials = state.user.credentials;
    return {}
    // const { error, paymentIntent } = await confirmPayment(
    //   state.checkout.paymentIntentClientSecret,
    //   {
    //     paymentMethodType: "Card",
    //     paymentMethodData: {
    //       billingDetails: {
    //         email: state.user.name,
    //         name: `${credentials?.name} ${credentials?.surname}`,
    //         address: {
    //           city: credentials.address,
    //           country: "PL",
    //         },
    //         phone: credentials?.phone_number,
    //       },
    //     },
    //   }
    // );

    // return { error, paymentIntent };
  }
);
