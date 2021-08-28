import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Button from "../../components/Button/Button";
import { API } from "../../constants/routes";
import { Colors } from "../../constants/styles";
import { useUser } from "../../context/UserContext";

const { width, height } = Dimensions.get("screen");

export default function Checkout({ route }: any) {
  const { cart, total } = route.params;
  const { user } = useUser();

  const [result, setResult] = useState("");

  async function Purchase() {
    try {
      const response = await axios.post(
        `${API}/payments/purchase`,
        {
          prod_id: cart.map(({ prod_id }: any) => prod_id),
        },
        {
          headers: {
            token: user.token,
          },
        }
      );
      if (response.data !== null) {
        setResult(response.data.message);
        console.log(response.data);
      }
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      {result === "Success" ? <View></View> : <View></View>}

      <View>
        <Text style={styles.text}>Address</Text>
        {/* address component */}
      </View>
      <View>
        <Text style={styles.text}>Phone number</Text>
        {/* phone input */}
      </View>
      <View>
        <Text style={styles.text}>Payment method</Text>
        {/* maybe stripe integration */}
      </View>

      <View style={{ width: width, justifyContent: "center" }}>
        {/* align it later */}
        <Button
          callback={Purchase}
          disabled={true}
          text={`Purchase $${total}`}
          style={{
            margin: 25,
            backgroundColor: Colors.secondary,
            color: Colors.text,
            width: width * 0.9,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    color: Colors.text,
    padding: 10,
  },
});
