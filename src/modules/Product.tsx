import React from "react";
import { View, Dimensions, Image, StyleSheet } from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/Button/Button";

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

export default function Product({
  title,
  price,
  description,
  category,
  img_id,
}: ProductTypeProps) {
  function AddToCart() {}
  function ShowMore() {}

  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Image source={{ uri: img }} style={styles.img} />

        <Button
          callback={AddToCart}
          style={styles.button}
          icon={<Image source={require("../assets/basket.png")} />}
        />

        <Button
          callback={ShowMore}
          style={[styles.button, { right: 70 }]}
          icon={<Image source={require("../assets/dots.png")} />}
        />
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
    backgroundColor: Colors.primary200,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT / 4,
    position: "relative",
  },
  img: {
    ...StyleSheet.absoluteFillObject,
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
});
