import React from "react";
import { View, Text } from "react-native";
import Delivery from "../Delivery";
import { ProductTypeProps } from "../Product/Product";
import styles from "./productDetailsStyle";

interface DetailsProps {
  result: ProductTypeProps;
}

export default function ProductDetailsText({ result }: DetailsProps) {
  return (
    <>
      <Text style={[styles.text, styles.title]}>{result?.title}</Text>

      <View style={[styles.container]}>
        <Text style={[styles.category]}>{result?.category}</Text>
        <Delivery />

        <Text style={[styles.text, styles.price]}>${result?.price}</Text>
      </View>

      <Text style={[styles.text, styles.description]}>
        {result?.description}
      </Text>
    </>
  );
}
