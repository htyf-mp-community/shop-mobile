import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { cartActions } from "redux/Cart";
import { initStripe, presentPaymentSheet } from "@stripe/stripe-react-native";
import { createPayment, createPaymentIntent } from "redux/Checkout/HttpService";
import { useUser } from "utils/context/UserContext";

const publishableKey =
  "pk_test_51KHt5OJFFDDymwGwp9gsCogqhxvzYvyo2wJsIAwSrPflIZjFZn2OtUhBbQAwt9SNek6Ol2e7QZUSh86NJyNByl2m00scfwXXjW";

export default function useCheckout(init = true) {
  const dispatch = useAppDispatch();
  const { paymentResult, paymentLoading, total } = useAppSelector(
    (state) => state.checkout
  );

  const user = useUser();

  useEffect(() => {
    if (init) {
      (async () => {
        await initStripe({ publishableKey });

        console.log("getClientSecret");

        await getClientSecret();
      })();
    }
  }, []);

  async function getClientSecret() {
    await dispatch(createPaymentIntent(user.user));
  }

  async function Purchase() {
    // await dispatch(createPayment()); OLD WAY

    await presentPaymentSheet().then(console.log).catch(console.warn);

    console.log("clearCart");

    await dispatch(cartActions.clearCart());
  }

  return {
    purchase: Purchase,
    result: paymentResult,
    loading: paymentLoading,
    total,
  };
}
