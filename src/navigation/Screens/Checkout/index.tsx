import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { ScreenNavigationProps } from "/@types/types";
import { Button, Input } from "@components/index";
import useCheckout from "@hooks/useCheckout";
import { CardField, initStripe } from "@stripe/stripe-react-native";
import { Formik } from "formik";
import checkoutSchema from "./checkoutSchema";
import { Colors } from "@constants/styles";
import { AntDesign } from "@expo/vector-icons";
import styles, { cardFieldStyles } from "./styles";
import Modal from "./Modal";
import PaymentMethods from "./PaymentMethods";

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
        <Formik
          initialValues={{
            name: "",
            surname: "",
            address: "",
          }}
          onSubmit={purchase}
          validationSchema={checkoutSchema}
        >
          {({
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            values,
            errors,
            dirty,
          }) => (
            <>
              <Input
                value={values.name}
                onChangeText={handleChange("name")}
                name={errors.name || "Name"}
                placeholder="Name"
                style={{
                  ...styles.input,
                  borderWidth: 1,
                  borderColor: errors.name ? "#FF3030" : Colors.primary100,
                }}
                labelStyle={{
                  color: errors.name ? "#FF3030" : "#fff",
                }}
                placeholderTextColor={errors.name ? "#FF3030" : "#fff"}
                onBlur={handleBlur("name")}
              />

              <Input
                value={values.surname}
                onChangeText={handleChange("surname")}
                name={errors.surname || "Surname"}
                placeholder="Surname"
                style={{
                  ...styles.input,
                  borderWidth: 1,
                  borderColor: errors.surname ? "#FF3030" : Colors.primary100,
                }}
                labelStyle={{
                  color: errors.surname ? "#FF3030" : "#fff",
                }}
                placeholderTextColor={errors.surname ? "#FF3030" : "#fff"}
                onBlur={handleBlur("surname")}
              />

              <Input
                value={values.address}
                onChangeText={handleChange("address")}
                name={errors.name || "Address"}
                placeholder="2780 Quincy Mountain Suite 162"
                style={{
                  ...styles.input,
                  borderWidth: 1,
                  borderColor: errors.address ? "#FF3030" : Colors.primary100,
                }}
                labelStyle={{
                  color: errors.address ? "#FF3030" : "#fff",
                }}
                placeholderTextColor={errors.address ? "#FF3030" : "#e3e3e3"}
                onBlur={handleBlur("address")}
              />

              <CardField
                placeholder={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={cardFieldStyles}
                style={styles.card}
              />

              <Button
                disabled={isValid || dirty}
                variant={isValid && dirty ? "primary" : "disabled"}
                text={`PAY $${total}`}
                icon={
                  <AntDesign
                    name="creditcard"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                style={[styles.button]}
                callback={handleSubmit}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <Modal />
    </>
  );
}
