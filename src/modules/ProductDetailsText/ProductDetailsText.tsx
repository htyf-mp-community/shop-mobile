import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import AddToCart from "../AddToCart/AddToCart";
import Delivery from "../Delivery";
import { ProductTypeProps } from "../Product/Product";

interface DetailsProps {
  result: ProductTypeProps;
}

export default function ProductDetailsText({ result }: DetailsProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
      delay: 200,
    }).start();
  }, [result.prod_id]);
  return (
    <>
      <Animated.Text style={[styles.text, styles.title, { opacity }]}>
        {result?.title}
      </Animated.Text>

      <Animated.View
        style={[{ opacity }, { flexDirection: "row", marginTop: 20 }]}
      >
        <AddToCart
          prod_id={result.prod_id}
          relative
          style={{ marginLeft: 20, marginRight: 10 }}
        />

        <Animated.Text
          style={[
            {
              opacity,
              color: "#fff",
              padding: 15,
              backgroundColor: Colors.primary100,
              borderRadius: 10,
              marginRight: 10,
            },
          ]}
        >
          {result?.category}
        </Animated.Text>
        <Delivery />

        <Animated.Text
          style={[
            styles.text,
            {
              opacity,
              fontSize: 25,
              padding: 5,
            },
          ]}
        >
          ${result?.price}
        </Animated.Text>
      </Animated.View>

      <Animated.Text
        style={[
          styles.text,
          {
            opacity,
            fontSize: 17,
            borderBottomWidth: 1,
            borderBottomColor: "#434655",
            marginBottom: 20,
          },
        ]}
      >
        {result?.description}
      </Animated.Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    padding: 20,
    backgroundColor: Colors.primary,
    fontFamily: "PoppinsMedium",
  },
  title: {
    fontSize: 25,
    padding: 10,
    paddingLeft: 15,
    fontFamily: "PoppinsBold",
    borderBottomWidth: 1,
    borderBottomColor: "#434655",
  },
});
