import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Colors, radius } from "../../constants/styles";
import { Stars } from "../Stars/Stars";

export interface RatingProps {
  rating_id: number;
  rating: number;
  title: string;
  description: string;
}

const { width } = Dimensions.get("screen");

export default function Ratings({
  rating_id,
  rating,
  title,
  description,
}: RatingProps) {
  return (
    <View key={rating_id} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Stars rating={rating} style={{ width: width * 0.55 }} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderWidth: 0.5,
    margin: 10,
    borderColor: Colors.text,
    borderRadius: radius.small,
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "PoppinsBold",
    color: Colors.text,
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 17,
    color: Colors.text,
  },
});
