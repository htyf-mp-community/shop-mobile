import React from "react";
import { View, Text } from "react-native";
import { Available, Avatar } from "@components/index";
import styles from "./productDetailsStyle";
import { Product } from "/@types/types";
import Delivery from "@modules/Delivery";
import useColorTheme from "@utils/context/ThemeContext";

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
        <Avatar url={require("@assets/notfound.png")} />
        <Available quantity={quantity as number} styles={{ margin: 5 }} />
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
