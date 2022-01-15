import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductTypeProps } from "../modules/Product/Product";
import { API } from "../constants/routes";
import { useStripe } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../@types/types";

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

  const [key, setKey] = useState("");

  const { confirmPayment } = useStripe();

  const [result, setResult] = useState("");

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
        setKey(data.clientSecret);
      })

      .catch((err) => console.warn(err.message));
  }

  useEffect(() => {
    getClientSecret();
  }, []);

  const navigation = useNavigation<useNavigationProps>();

  async function Purchase({ address, name, surname }: PurchaseProps) {
    try {
      if (key) {
        const { paymentIntent, error } = await confirmPayment(key, {
          type: "Card",
          billingDetails: {
            email: user.name,
            name: `${name} ${surname}`,
            addressCity: address,
          },
        });

        if (!error) {
          console.log(`[STRIPE] billed for ${paymentIntent.amount}`);
          try {
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
              setResult(response.data.message);
              Alert.alert("Thank you", "Payment succed");
              navigation.navigate("Home");
            }
          } catch (error) {}
        }
      }
    } catch (error) {}
  }

  return [Purchase, result, total];
}
