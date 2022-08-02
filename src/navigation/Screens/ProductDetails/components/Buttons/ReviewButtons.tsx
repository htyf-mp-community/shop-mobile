import React from "react";
import { View } from "react-native";
import Button from "@components/Button/Button";
import { ProductRatingProps, useNavigationProps } from "/@types/types";
import { useNavigation } from "@react-navigation/native";
import Color from "color";

interface DetailsButtonsProps {
  name: string;
  thumbnail: string;
  sharedID: string;
  prod_id: number;
  reviews?: ProductRatingProps[];
}

export default function ReviewButtons({
  name,
  thumbnail,
  sharedID,
  prod_id,
  reviews,
}: DetailsButtonsProps) {
  const navigation = useNavigation<useNavigationProps>();

  const navigateReviews = () =>
    navigation.navigate("ProductReviews", {
      prod_id,
      prod_name: name,
      reviews: reviews || [],
      sharedID,
    });

  const navigateCreate = () =>
    navigation.navigate("CreateReview", {
      thumbnail,
      prod_id,
      prod_name: name,
      sharedID,
    });

  const backgroundColor = Color("green").alpha(0.15).string();

  return (
    <View
      style={{
        justifyContent: "space-around",
        marginVertical: 15,
        flexDirection: "row",
      }}
    >
      <Button
        size="xl"
        text="Create review"
        variant="primary"
        style={{
          backgroundColor,
          flex: 1,
          marginRight: 10,
        }}
        fontStyle={{ color: "lightgreen" }}
        callback={navigateCreate}
      />
      <Button
        variant="primary"
        text="Reviews"
        fontStyle={{ color: "lightgreen" }}
        style={{
          flex: 1,
          backgroundColor,
        }}
        callback={navigateReviews}
      />
    </View>
  );
}
