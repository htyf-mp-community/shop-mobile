import React from "react";
import { View, Dimensions, Image, StyleSheet, Text } from "react-native";
import { radius } from "../constants/styles";
import Button from "../components/Button/Button";
import AddToCart from "./AddToCart";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const img = "https://www.pcworld.pl/g1/news/thumb/3/5/353579";

type ImgType = {
  id: number;
  name: string;
};

export type ProductTypeProps = {
  prod_id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  img_id: ImgType; // take only 1 for thumbnail
};

export default function Product({ price, prod_id }: ProductTypeProps) {
  function ShowMore() {}

  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Image source={{ uri: img }} style={styles.img} />

        <AddToCart prod_id={prod_id} />

        <Button
          callback={ShowMore}
          style={[styles.button, { right: 70 }]}
          icon={<Image source={require("../assets/dots.png")} />}
        />

        <Text style={styles.info}>${price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_HEIGHT / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  product: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT / 4,
    position: "relative",
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.small,
  },

  text: {
    color: "#009950",
    marginLeft: 10,
  },
  button: {
    color: "#fff",
    width: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#009950",
  },
  info: {
    backgroundColor: "#009950",
    color: "white",
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
  },
});
