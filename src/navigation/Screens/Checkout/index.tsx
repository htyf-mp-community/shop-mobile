import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { ScreenNavigationProps } from "/@types/types";
import { Button, Input } from "@components/index";
import useCheckout from "utils/hooks/useCheckout";
import { CardField, initStripe } from "@stripe/stripe-react-native";
import { Formik } from "formik";
import checkoutSchema from "./checkoutSchema";
import { AntDesign } from "@expo/vector-icons";
import styles, { cardFieldStyles } from "./styles";
import Modal from "./components/Modal";
import PaymentMethods from "./components/PaymentMethods";
import { useAppSelector } from "utils/hooks/hooks";

export default function Checkout({
  route,
}: Required<ScreenNavigationProps<"Checkout">>) {
  const { purchase, total } = useCheckout({ route });

  const { credentials } = useAppSelector((st) => st.user);

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
          enableReinitialize
          initialValues={{
            name: credentials.name,
            surname: credentials.surname,
            address: credentials.address,
          }}
          onSubmit={purchase}
          validationSchema={checkoutSchema}
          validateOnChange
        >
          {({
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            values,
            errors,
            dirty,
            touched,
          }) => {
            return (
              <>
                <Input
                  value={values.name}
                  onChangeText={handleChange("name")}
                  name={!!errors.name && touched.name ? errors.name : "Name"}
                  placeholder="Name"
                  style={styles.input}
                  onBlur={handleBlur("name")}
                  error={!!errors.name && touched.name}
                />

                <Input
                  value={values.surname}
                  onChangeText={handleChange("surname")}
                  name={
                    !!errors.surname && touched.surname
                      ? errors.surname
                      : "Surname"
                  }
                  placeholder="Surname"
                  style={styles.input}
                  error={!!errors.surname && touched.surname}
                  onBlur={handleBlur("surname")}
                />

                <Input
                  value={values.address}
                  onChangeText={handleChange("address")}
                  name={
                    !!errors.address && touched.address
                      ? errors.address
                      : "Address"
                  }
                  placeholder="2780 Quincy Mountain Suite 162"
                  style={styles.input}
                  error={!!errors.address && touched.address}
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
                  variant={isValid && dirty ? "primary" : "disabled"}
                  disabled={!(isValid && dirty)}
                  text={`PAY $${total}`}
                  icon={
                    <AntDesign
                      name="creditcard"
                      size={24}
                      color="white"
                      style={{ marginRight: 10 }}
                    />
                  }
                  style={[
                    styles.button,
                    { paddingVertical: 20, borderRadius: 10, marginTop: 15 },
                  ]}
                  onPress={() => handleSubmit()}
                />
              </>
            );
          }}
        </Formik>
      </ScrollView>
      <Modal />
    </>
  );
}
