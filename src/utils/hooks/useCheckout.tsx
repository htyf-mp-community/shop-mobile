import { useUser } from "@context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { ProductTypeProps } from "@modules/Product/Product";
import { API } from "@constants/routes";
import { useStripe } from "@stripe/stripe-react-native";
import { checkoutActions } from "@redux/Checkout";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../../@types/types";
import { notUndefined } from "@functions/typecheckers";

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

  const navigation = useNavigation<useNavigationProps>();

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

        dispatch(checkoutActions.setCharged(paymentIntent?.amount));

        if (!error) {
          dispatch(checkoutActions.updateTransactionStatus());
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
          if (response.data !== null && notUndefined(response.data)) {
            dispatch(checkoutActions.updateTransactionStatus());
            if (redirect) {
              navigation.navigate("Home");
            }
          }
        } else {
          console.warn(error);
          dispatch(checkoutActions.failTransaction(error));
        }
      }
    } catch (error) {
      console.warn(error);
      dispatch(checkoutActions.failTransaction(error));
    }
  }

  return {
    purchase: Purchase,
    result: paymentResult,
    total,
    loading: paymentLoading,
  };
}
