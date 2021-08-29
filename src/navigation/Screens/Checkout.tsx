import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";
import { API } from "../../constants/routes";
import { Colors } from "../../constants/styles";
import { useUser } from "../../context/UserContext";
import Personals from "../../modules/Checkout";

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
      <Personals />

      {!!result && <Message status={result} />}

      <View style={{ width: width, justifyContent: "center" }}>
        <Button
          callback={Purchase}
          disabled={false}
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
