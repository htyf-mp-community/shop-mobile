import React from "react";
import { View, StyleSheet, Text } from "react-native";

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
      {ratings?.map((el) => {
        return (
          <View key={el.rating_id}>
            <Text style={styles.title}>{el.title}</Text>
            <Text style={styles.text}>{el.rating}</Text>
            <Text style={styles.text}>{el.description}</Text>
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
    color: "white",
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 17,
    color: "white",
  },
});
