import axios from "axios";
import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../components/Button/Button";
import { API } from "../constants/routes";
import { useUser } from "../context/UserContext";

const { width } = Dimensions.get("screen");

export default function Purchase({ prod_id }: { prod_id: number }) {
  const { user } = useUser();

  async function PurchaseProduct() {
    try {
      const response = await axios.post(
        API + "/purchase",
        { prod_id },
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
        text="Check out"
        callback={PurchaseProduct}
        style={{ backgroundColor: "green", color: "white", width: width * 0.9 }}
      />
    </View>
  );
}
