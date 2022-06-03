import { useUser } from "@utils/context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { API } from "@constants/routes";
import { useStripe } from "@stripe/stripe-react-native";
import { checkoutActions } from "@redux/Checkout";
import { useAppDispatch, useAppSelector } from "./hooks";
import { cartActions } from "redux/Cart";

interface useCheckoutProps {
  route: any;
  redirect?: boolean;
}

interface PurchaseProps {
  name: string;
  surname: string;
  address: string;
}

export default function useCheckout({
  route,
  redirect = false,
}: useCheckoutProps) {
  const { cart, total } = route.params;
  const { user } = useUser();
  const { confirmPayment } = useStripe();

  const dispatch = useAppDispatch();
  const { paymentIntentClientSecret, paymentResult, paymentLoading } =
    useAppSelector((state) => state.checkout);

  async function getClientSecret() {
    try {
      const { data } = await axios.post(
        `${API}/payments/create-payment-intent`,
        {
          prod_id: cart.map(({ prod_id }: any) => prod_id),
          user_id: user.user_id,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );

      dispatch(checkoutActions.setSecret(data.clientSecret));
    } catch (error) {
      console.warn("checkout screen");
    }
  }

  useEffect(() => {
    getClientSecret();
  }, []);

  async function Purchase({ address, name, surname }: PurchaseProps) {
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
              name: `${name} ${surname}`,
              addressCity: address,
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
    total: total as number,
    loading: paymentLoading,
  };
}
