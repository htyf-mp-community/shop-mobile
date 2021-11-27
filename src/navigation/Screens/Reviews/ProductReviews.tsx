import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import Ratings, { RatingProps } from "../../../modules/Ratings/Ratings";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("screen");

export default function ProductReviews({ route }: any) {
  const { reviews, prod_id, sharedID, thumbnail } = route.params;
  return (
    <View style={styles.container}>
      <SharedElement
        id={`prod_id.${prod_id}${sharedID}`}
        style={{ marginTop: 15, marginBottom: 15 }}
      >
        <Image
          source={{ uri: thumbnail }}
          style={{ width: width, height: height / 4 }}
          resizeMode="cover"
          resizeMethod="scale"
        />
      </SharedElement>
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
