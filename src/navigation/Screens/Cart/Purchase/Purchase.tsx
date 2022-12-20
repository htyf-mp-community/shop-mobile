import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { ProductMinified, useNavigationProps } from "../../../../@types/types";
import Button from "../../../../components/ui/Button/Button";
import useColorTheme from "@utils/context/ThemeContext";
import { CalcTotalCartPrice } from "../../../../functions/CalcTotalCartPrice";
import styles from "./Purchases.styles";
import Color from "color";
import { Colors } from "constants/styles";

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

  const primaryLighten = Color(Colors.primary).lighten(0.5).string();

  return (
    <View
      style={[
        styles.container,
        {
          borderTopColor: primaryLighten,
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
        text={`PAY $${totalPrice}`}
        callback={PurchaseProduct}
        fontStyle={{ color: "#fff" }}
        style={[
          {
            backgroundColor: !disabled ? theme.secondary : primaryLighten,
            borderRadius: 100,
          },
          styles.button,
        ]}
      />
    </View>
  );
}
