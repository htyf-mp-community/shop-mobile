import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { cartActions } from "redux/Cart";
// import { initStripe, presentPaymentSheet } from "@stripe/stripe-react-native";
import { createPaymentIntent } from "redux/Checkout/HttpService";
import { useUser } from "utils/context/UserContext";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";

const publishableKey =
  "pk_test_51KHt5OJFFDDymwGwp9gsCogqhxvzYvyo2wJsIAwSrPflIZjFZn2OtUhBbQAwt9SNek6Ol2e7QZUSh86NJyNByl2m00scfwXXjW";

export default function useCheckout(init = true) {
  const dispatch = useAppDispatch();
  const { paymentResult, paymentLoading, total } = useAppSelector(
    (state) => state.checkout
  );
  const navigation = useNavigation<useNavigationProps>();

  const user = useUser();

  useEffect(() => {
    if (init) {
      (async () => {
        // await initStripe({ publishableKey });

        // await getClientSecret();
      })();
    }
  }, []);

  async function getClientSecret() {
    await dispatch(createPaymentIntent(user.user));
  }

  async function Purchase() {
    // await dispatch(createPayment()); OLD WAY
    return
    // const { error, paymentOption } = await presentPaymentSheet();

    // if (error) return;

    await dispatch(cartActions.clearCart());

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }, { name: "PurchaseHistory" }],
      })
    );
  }

  return {
    purchase: Purchase,
    result: paymentResult,
    loading: paymentLoading,
    total,
  };
}
