import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { ProductTypeProps } from "../modules/Product/Product";
import { API } from "../constants/routes";
import { useStripe } from "@stripe/stripe-react-native";
import { checkoutActions } from "../redux/Checkout";
import { useAppDispatch, useAppSelector } from "./hooks";

interface useCheckoutProps {
  route: any;
}

interface PurchaseProps {
  name: string;
  surname: string;
  address: string;
}

export default function useCheckout({ route }: useCheckoutProps) {
  const { cart, total } = route.params;
  const { user } = useUser();
  const { confirmPayment } = useStripe();

  const dispatch = useAppDispatch();
  const { paymentIntentClientSecret, paymentResult, paymentLoading } =
    useAppSelector((state) => state.checkout);

  async function getClientSecret() {
    axios
      .post(
        `${API}/payments/create-payment-intent`,
        { prod_id: cart },
        {
          headers: {
            token: user.token,
          },
        }
      )
      .then(({ data }) => {
        dispatch(checkoutActions.setSecret(data.clientSecret));
      })

      .catch((err) => console.warn(err.message));
  }

  useEffect(() => {
    getClientSecret();
  }, []);

  async function Purchase({ address, name, surname }: PurchaseProps) {
    dispatch(checkoutActions.toggleLoading());
    try {
      if (paymentIntentClientSecret) {
        const { paymentIntent, error } = await confirmPayment(
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

        if (!error) {
          console.log(`[STRIPE] billed for ${paymentIntent.amount}`);

          const response = await axios.post(
            `${API}/payments/purchase`,
            {
              prod_id: cart.map(({ prod_id }: ProductTypeProps) => prod_id),
            },
            {
              headers: {
                token: user.token,
              },
            }
          );
          if (response.data !== null) {
            dispatch(checkoutActions.setResult("OK"));
            dispatch(checkoutActions.toggleLoading());
          }
        }
      }
    } catch (error) {
      dispatch(checkoutActions.toggleLoading());
    }
  }

  return {
    purchase: Purchase,
    result: paymentResult,
    total,
    loading: paymentLoading,
  };
}
