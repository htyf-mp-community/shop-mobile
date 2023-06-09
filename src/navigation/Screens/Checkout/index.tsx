import React from "react";
import { Text, View } from "react-native";
import useCheckout from "./hooks/useCheckout";
import styles from "./styles";
import { Header } from "components";
import Form from "./components/Form";
import CheckoutModal from "./components/CheckoutModal";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { checkoutActions } from "redux/Checkout";
import ModalLoader from "components/ui/ModalLoader";

interface Input {
  name: string;
  surname: string;
  street: string;
  apartment_number: string;
  city: string;
  phone: string;
}

export default function Checkout() {
  const { purchase, total } = useCheckout(true);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = React.useState(false);

  const { paymentIntentClientSecretLoading, paymentError } = useAppSelector(
    (s) => s.checkout
  );

  const onSubmit = async (input: Input) => {
    setIsVisible(true);
    dispatch(checkoutActions.saveCredentials(input));
  };

  const onCancel = () => setIsVisible(false);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <ModalLoader isVisible={paymentIntentClientSecretLoading} />

      <Header>
        <Text style={{ color: "#fff", fontSize: 20, padding: 10 }}>
          {paymentIntentClientSecretLoading
            ? "Loading..."
            : "Total $" + total.toFixed(2)}
        </Text>
      </Header>

      <Form onSubmit={onSubmit} />

      <CheckoutModal
        onCancel={onCancel}
        onSubmit={purchase}
        isVisible={isVisible}
      />
    </View>
  );
}
