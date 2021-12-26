import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Colors } from "../../../constants/styles";
import Ratings from "../../../modules/Ratings/Ratings";

export default function ProductReviews({ route }: any) {
  const { reviews } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={({ rating_id }) => rating_id.toString()}
        renderItem={({ item }) => <Ratings {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
