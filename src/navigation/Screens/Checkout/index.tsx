import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { ScreenNavigationProps } from "/@types/types";
import useCheckout from "utils/hooks/useCheckout";
import { initStripe } from "@stripe/stripe-react-native";
import styles from "./styles";
import Modal from "./components/Modal";
import PaymentMethods from "./components/PaymentMethods";
import Form from "./components/Form";

export default function Checkout({
  route,
}: Required<ScreenNavigationProps<"Checkout">>) {
  const { purchase, total } = useCheckout({ route });

  useEffect(() => {
    initStripe({
      publishableKey:
        "pk_test_51KHt5OJFFDDymwGwp9gsCogqhxvzYvyo2wJsIAwSrPflIZjFZn2OtUhBbQAwt9SNek6Ol2e7QZUSh86NJyNByl2m00scfwXXjW",
    });
  }, []);

  return (
    <>
      <ScrollView style={[styles.container]}>
        <PaymentMethods />
        <Form onSubmit={purchase} total={total} />
      </ScrollView>
      <Modal />
    </>
  );
}
