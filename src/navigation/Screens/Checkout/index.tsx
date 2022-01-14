import React, { useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { ScreenNavigationProps } from "../../../@types/types";
import { Button } from "../../../components";
import { Colors } from "../../../constants/styles";
import useCheckout from "../../../hooks/useCheckout";
import { CardField, initStripe } from "@stripe/stripe-react-native";

const { width, height } = Dimensions.get("window");

export default function Checkout({
  route,
  navigation,
}: Required<ScreenNavigationProps<"Checkout">>) {
  const [purchase, result, total] = useCheckout({ route });

  useEffect(() => {
    initStripe({
      publishableKey:
        "pk_test_51KHt5OJFFDDymwGwp9gsCogqhxvzYvyo2wJsIAwSrPflIZjFZn2OtUhBbQAwt9SNek6Ol2e7QZUSh86NJyNByl2m00scfwXXjW",
      merchantIdentifier: "merchant.identifier",
    });
  }, []);

  return (
    <View style={[styles.container]}>
      <ScrollView style={[styles.list]}>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
        />
      </ScrollView>
      <View style={[styles.bottomTab]}>
        <Button
          text={`Pay $${total}`}
          style={{ padding: 15, justifyContent: "center" }}
          onPress={purchase}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  list: {
    height: height * 0.9,
  },
  bottomTab: {
    borderWidth: 1,
    borderTopColor: Colors.primary100,
    height: height * 0.1,
    padding: 10,
  },
});
