import React from "react";
import { View, Text } from "react-native";
import { Available, Avatar } from "../../components";
import styles from "./productDetailsStyle";
import { Product } from "../../@types/types";
import Delivery from "../Delivery";
import useColorTheme from "../../context/ThemeContext";

export default function ProductDetailsText({
  title,
  description,
  quantity,
  price,
}: Product) {
  const { theme } = useColorTheme();
  return (
    <>
      <Text
        style={[
          styles.text,
          styles.title,
          { color: theme.text, textAlign: "center" },
        ]}
      >
        {title}
      </Text>

      <View style={[styles.container]}>
        <Avatar url={require("../../assets/notfound.png")} />
        <Available quantity={quantity} styles={{ margin: 5 }} />
        <Delivery />

        <Text style={styles.price}>${price}</Text>
      </View>

      <Text
        style={[
          styles.text,
          styles.description,
          { marginTop: 15, color: theme.text },
        ]}
      >
        {description}
      </Text>
    </>
  );
}
