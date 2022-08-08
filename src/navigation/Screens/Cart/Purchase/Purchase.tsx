import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { ProductMinified, useNavigationProps } from "../../../../@types/types";
import Button from "../../../../components/Button/Button";
import useColorTheme from "@utils/context/ThemeContext";
import { CalcTotalCartPrice } from "../../../../functions/CalcTotalCartPrice";
import styles from "./Purchases.styles";

interface CartProduct extends ProductMinified {
  ammount: number;
}

interface PurchaseProps {
  cart: CartProduct[];
}

export default function Purchase({ cart }: PurchaseProps) {
  const navigation = useNavigation<useNavigationProps>();
  const totalPrice = useMemo(() => CalcTotalCartPrice(cart), [cart]);

  function PurchaseProduct() {
    navigation.navigate("Checkout", { cart, total: totalPrice });
  }

  const disabled = cart.length === 0;

  const { theme } = useColorTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderTopColor: theme.primary100,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.text }]}>Total:</Text>
        <Text style={[styles.text, { color: theme.text }]}>${totalPrice}</Text>
      </View>
      <Button
        testID={"PURCHASE.BUTTON"}
        disabled={disabled}
        text={`Continue with $${totalPrice}`}
        callback={PurchaseProduct}
        fontStyle={{ color: "#fff" }}
        style={[
          {
            backgroundColor: !disabled ? theme.secondary : theme.primary100,
          },
          styles.button,
        ]}
      />
    </View>
  );
}
