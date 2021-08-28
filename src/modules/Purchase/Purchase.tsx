import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Dimensions, Text } from "react-native";
import Button from "../../components/Button/Button";
import { Colors } from "../../constants/styles";
import { CalcTotalCartPrice } from "../../functions/CalcTotalCartPrice";

const { width } = Dimensions.get("screen");

interface IPurchaseProps {
  cart: any[];
}

export default function Purchase({ cart }: IPurchaseProps) {
  const navigation = useNavigation<any>();
  const totalPrice = CalcTotalCartPrice(cart);

  function PurchaseProduct() {
    navigation.navigate("Checkout", { cart, total: totalPrice });
  }

  return (
    <View style={{ width, alignItems: "center", padding: 10, bottom: 5 }}>
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
        disabled={cart.length === 0}
        text={`Check out `}
        callback={PurchaseProduct}
        style={{
          backgroundColor: Colors.secondary,
          color: Colors.text,
          width: width * 0.9,
          justifyContent: "center",
        }}
      />
    </View>
  );
}
