import { useUser } from "@utils/context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { API } from "@constants/routes";
import { useStripe } from "@stripe/stripe-react-native";
import { checkoutActions } from "@redux/Checkout";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { cartActions } from "redux/Cart";
import { initStripe } from "@stripe/stripe-react-native";

const publishableKey =
  "pk_test_51KHt5OJFFDDymwGwp9gsCogqhxvzYvyo2wJsIAwSrPflIZjFZn2OtUhBbQAwt9SNek6Ol2e7QZUSh86NJyNByl2m00scfwXXjW";

export default function useCheckout(init = true) {
  const { user } = useUser();
  const { confirmPayment } = useStripe();

  const dispatch = useAppDispatch();
  const {
    paymentIntentClientSecret,
    paymentResult,
    paymentLoading,
    credentials,
    total,
  } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (init) {
      initStripe({ publishableKey });
    }
  }, []);

  useEffect(() => {
    if (init) {
      getClientSecret();
    }
  }, []);

  async function getClientSecret() {
    try {
      const { data } = await axios.post(
        `${API}/payments/create-payment-intent`,
        {},
        {
          headers: {
            token: user.token,
          },
        }
      );

      dispatch(checkoutActions.setSecret(data.clientSecret));
      dispatch(checkoutActions.setTotal(data.total));
    } catch (error) {
      console.warn(error);
    }
  }

  async function Purchase() {
    dispatch(checkoutActions.startTransaction());
    dispatch(checkoutActions.updateTransactionStatus());
    try {
      if (paymentIntentClientSecret) {
        const { error, paymentIntent } = await confirmPayment(
          paymentIntentClientSecret,
          {
            type: "Card",

            billingDetails: {
              email: user.name,
              name: `${credentials.name} ${credentials.surname}`,
              addressCity: credentials.city,
              phone: credentials.phone,
            },
          }
        );

        dispatch(checkoutActions.setCharged(paymentIntent!.amount));

        if (!error) {
          dispatch(checkoutActions.finishTransaction());

          dispatch(cartActions.clearCart());
        } else {
          console.warn(error);
          dispatch(checkoutActions.failTransaction(error.message));
        }
      }
    } catch (error) {
      console.warn(error);
      dispatch(checkoutActions.failTransaction("Transaction failed"));
    }
  }

  return {
    purchase: Purchase,
    result: paymentResult,
    loading: paymentLoading,
    total,
  };
}
