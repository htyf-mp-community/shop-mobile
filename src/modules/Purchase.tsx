import axios from "axios";
import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../components/Button/Button";
import { API } from "../constants/routes";
import { useUser } from "../context/UserContext";

const { width } = Dimensions.get("screen");

interface IPurchaseProps {
  cart: any[];
}

export default function Purchase({ cart }: IPurchaseProps) {
  const { user } = useUser();

  const ids = cart.map(({ prod_id, ammount }) => ({ prod_id, ammount }));
  const totalPrice =
    cart.length > 1
      ? cart
          .map(({ price }) => Number(price))
          .reduce((a, b) => a + b)
          .toFixed(2)
      : cart.map(({ price }) => price)[0];

  async function PurchaseProduct() {
    try {
      const response = await axios.post(
        API + "/purchase",
        { ids },
        {
          headers: {
            token: user.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ width, alignItems: "center", padding: 10 }}>
      <Button
        text={"Check out, total: $" + totalPrice}
        callback={PurchaseProduct}
        style={{ backgroundColor: "green", color: "white", width: width * 0.9 }}
      />
    </View>
  );
}
