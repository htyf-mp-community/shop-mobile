import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";
import Dots from "../../components/Dots/Dots";
import { ProductTypeProps } from "../Product/Product";

interface DetailsProps {
  result: ProductTypeProps;
  images: any[];
  scrollX: Animated.Value;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function ProductDetailsText({
  result,
  images,
  scrollX,
}: DetailsProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
      delay: 500,
    }).start();
  }, [result.prod_id]);
  return (
    <>
      <Animated.View style={[styles.dots, { opacity }]}>
        <Dots arr={[...images, 1]} x={scrollX} />
      </Animated.View>

      <Animated.Text style={[styles.text, styles.title, { opacity }]}>
        {result?.title}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity, fontSize: 25 }]}>
        ${result?.price}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity, fontSize: 17 }]}>
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
    marginBottom: 20,
    backgroundColor: "#292929",
    fontFamily: "PoppinsMedium",
  },
  title: {
    fontSize: 31,
    padding: 10,
    paddingLeft: 15,
    fontFamily: "PoppinsBold",
  },
  dots: {
    position: "absolute",
    top: 210,
    zIndex: 11,
    flexDirection: "row",
    padding: 10,
    width: SCREEN_WIDTH,
    justifyContent: "center",
  },
});
