import React from "react";
import { Text, View } from "react-native";
import useCheckout from "./hooks/useCheckout";
import styles from "./styles";
import { Header, Modal, ThemedText } from "components";
import Form from "./components/Form";
import CheckoutModal from "./components/CheckoutModal";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { checkoutActions } from "redux/Checkout";
import ModalLoader from "components/ui/ModalLoader";
// import {
//   initPaymentSheet,
//   presentPaymentSheet,
// } from "@stripe/stripe-react-native";
import { Colors, Fonts } from "constants/styles";
import Color from "color";

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
  const { paymentIntentClientSecretLoading, ...checkout } = useAppSelector(
    (s) => s.checkout
  );
  const products = useAppSelector((s) => s.cart.cart);

  React.useEffect(() => {
    if (checkout.paymentIntentClientSecret !== "") {
      (async () => {
        // const props = await initPaymentSheet({
        //   paymentIntentClientSecret: checkout.paymentIntentClientSecret,
        //   merchantDisplayName: "DMQ Store",
        //   allowsDelayedPaymentMethods: false,

        //   appearance: {
        //     primaryButton: {
        //       shapes: {
        //         borderRadius: 50,
        //       },
        //       colors: {
        //         background: Colors.secondary,
        //       },
        //     },
        //     colors: {
        //       background: Colors.primary,
        //       componentBackground: Colors.primary_light,
        //       componentBorder: Color(Colors.primary).darken(1).hex(),
        //       componentDivider: Color(Colors.primary).darken(1).hex(),
        //     },
        //   },
        // });

        // console.log(props);
      })();
    }
  }, [checkout.paymentIntentClientSecret]);

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

      <Form
        // onSubmit={onSubmit}
        onSubmit={purchase}
      />

      <Modal isVisible={false}>
        <ThemedText style={{ fontSize: 22, fontWeight: "bold" }}>
          Purchase details
        </ThemedText>

        <View style={{ padding: 5 }}>
          {products.map((p) => (
            <ThemedText style={{ color: "gray" }} key={p.prod_id}>
              {p.title} x{p.ammount} ${p.price}
            </ThemedText>
          ))}
        </View>
      </Modal>
    </View>
  );
}
