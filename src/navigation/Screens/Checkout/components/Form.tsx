import { Formik } from "formik";
import { useAppSelector } from "utils/hooks/hooks";
import checkoutSchema from "../helpers/checkoutSchema";
import { Button } from "components/index";
import { View, Text } from "react-native";
import Row from "./Row";
import { ScrollView } from "react-native-gesture-handler";
import { ValidatedInput } from "@components/index";
import Separator from "./Separator";

import { AntDesign } from "@expo/vector-icons";
import useListenKeyboard from "utils/hooks/useListenKeyboard";
import Animated, { FadeInDown } from "react-native-reanimated";
import layout from "constants/layout";

interface FormProps {
  onSubmit: (v: any) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const { credentials } = useAppSelector((st) => st.user);
  const inputWidth = { width: layout.screen.width - 20 };

  const kb = useListenKeyboard();

  const [adress, apart, city] = credentials?.address?.split(" ") || [
    "",
    "",
    "",
  ];

  const products = useAppSelector((s) => s.cart.cart);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: credentials?.name || "",
        surname: credentials?.surname || "",
        street: adress || "",
        apartment_number: apart || "",
        city: city || "",
        phone: credentials.phone_number ? "+48" + credentials.phone_number : "",
      }}
      onSubmit={onSubmit}
      validationSchema={checkoutSchema}
      validateOnChange
    >
      {(f) => {
        return (
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ width: layout.screen.width }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View style={{ width: "100%", paddingHorizontal: 15 }}>
                {products.map((product) => (
                  <Text
                    key={product.prod_id}
                    style={{ fontSize: 12, color: "#fff" }}
                  >
                    {product.title} x{product.ammount}
                  </Text>
                ))}
              </View>

              <Separator text="Personal Information" />
              <ValidatedInput
                name="name"
                style={inputWidth}
                leftIcon={<AntDesign name="user" size={20} color="white" />}
                {...f}
              />

              <ValidatedInput
                name="surname"
                style={inputWidth}
                leftIcon={<AntDesign name="user" size={20} color="white" />}
                {...f}
              />

              <Separator text="Contact Information" />

              <ValidatedInput name="street" style={inputWidth} {...f} />

              <Row>
                <ValidatedInput
                  name="apartment_number"
                  style={{ width: layout.screen.width / 2 - 15 }}
                  label="Apartment nr"
                  {...f}
                />
                <ValidatedInput
                  name="city"
                  style={{ width: layout.screen.width / 2 - 15 }}
                  {...f}
                />
              </Row>

              <ValidatedInput
                placeholder="+00 000 000 000"
                name="phone"
                style={inputWidth}
                {...f}
              />
            </ScrollView>
            {kb.status === kb.variants.closed && (
              <Animated.View
                entering={FadeInDown}
                style={{ position: "absolute", bottom: 0, padding: 10 }}
              >
                <Button
                  type="contained"
                  color="primary"
                  borderRadius="full"
                  disabled={!f.isValid}
                  text="Continue to payment"
                  style={{
                    paddingVertical: 20,
                    marginVertical: 15,
                    width: layout.screen.width - 20,
                    borderRadius: 50,
                  }}
                  onPress={() => f.handleSubmit()}
                />
              </Animated.View>
            )}
          </View>
        );
      }}
    </Formik>
  );
}
