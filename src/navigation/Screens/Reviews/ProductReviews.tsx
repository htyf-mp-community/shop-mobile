import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import Ratings, { RatingProps } from "../../../modules/Ratings/Ratings";

export default function ProductReviews({ route }: any) {
  const { reviews } = route.params;
  return (
    <View style={styles.container}>
      {reviews?.map((el: RatingProps) => {
        return <Ratings key={el.rating_id} {...el} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
