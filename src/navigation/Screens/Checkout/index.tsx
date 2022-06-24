import React from "react";
import { Text, View } from "react-native";
import useCheckout from "./hooks/useCheckout";
import styles from "./styles";
import { Button, Header } from "components";
import Form from "./components/Form";
import CheckoutModal from "./components/CheckoutModal";
import { useAppDispatch } from "utils/hooks/hooks";
import { checkoutActions } from "redux/Checkout";

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

  const onSubmit = async (input: Input) => {
    setIsVisible(true);
    dispatch(checkoutActions.setCredentials(input));
  };

  const onCancel = () => setIsVisible(false);

  const handleSubmitPayment = async () => {
    purchase();
  };

  return (
    <View style={styles.container}>
      <Header>
        <Text style={{ color: "#fff", fontSize: 20, padding: 10 }}>
          Total ${total === 0 ? "Loading..." : total.toFixed(2)}
        </Text>
      </Header>

      <Form onSubmit={onSubmit} />

      <CheckoutModal
        onCancel={onCancel}
        onSubmit={handleSubmitPayment}
        isVisible={isVisible}
      />
    </View>
  );
}
