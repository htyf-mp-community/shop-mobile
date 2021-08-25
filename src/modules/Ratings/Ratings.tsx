import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/styles";

interface RatingProps {
  ratings: {
    rating_id: number;
    rating: number;
    title: string;
    description: string;
  }[];
}

export default function Ratings({ ratings }: RatingProps) {
  return (
    <View style={styles.container}>
      {ratings?.map(({ rating_id, title, rating, description }) => {
        return (
          <View key={rating_id}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{rating}</Text>
            <Text style={styles.text}>{description}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#292929",
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    color: Colors.text,
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 17,
    color: Colors.text,
  },
});
