import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

interface AddReviewProps {
  prod_id: number;
}

export default function AddReview({ prod_id }: AddReviewProps) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});
