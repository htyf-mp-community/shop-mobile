import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { Product, useNavigationProps } from "../../@types/types";
import Button from "../../components/Button/Button";
import { Colors } from "../../constants/styles";
import { CalcTotalCartPrice } from "../../functions/CalcTotalCartPrice";

interface IPurchaseProps {
  cart: Product[];
}

export default function Purchase({ cart }: IPurchaseProps) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<useNavigationProps>();
  const totalPrice = CalcTotalCartPrice(cart);

  function PurchaseProduct() {
    navigation.navigate("Checkout", { cart, total: totalPrice });
  }

  const disabled = cart.length === 0;

  return (
    <View
      style={{
        width,
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.primary100,
      }}
    >
      <View
        style={{
          width: width * 0.9,
          paddingBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: Colors.text,
            fontSize: 20,
            fontFamily: "PoppinsRegular",
          }}
        >
          Total:
        </Text>
        <Text
          style={{
            color: Colors.text,
            fontSize: 20,
            fontFamily: "PoppinsRegular",
          }}
        >
          ${totalPrice}
        </Text>
      </View>
      <Button
        disabled={disabled}
        text={`Continue with $${totalPrice} `}
        callback={PurchaseProduct}
        style={{
          backgroundColor: !disabled ? Colors.secondary : Colors.primary100,
          width: width * 0.9,
          justifyContent: "center",
          padding: 15,
        }}
      />
    </View>
  );
}
