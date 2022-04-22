import React from "react";
import { View, Dimensions } from "react-native";
import Button from "@components/Button/Button";
import { ProductRatingProps, useNavigationProps } from "/@types/types";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@constants/styles";
import Color from "color";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

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
  return (
    <View
      style={{
        justifyContent: "space-around",
        marginBottom: 20,
        flexDirection: "row",
      }}
    >
      <Button
        size="xl"
        text="Create review"
        variant="primary"
        style={{
          backgroundColor: Color("green").alpha(0.15).string(),
          flex: 1,
          marginRight: 10,
        }}
        fontStyle={{ color: "lightgreen" }}
        callback={() =>
          navigation.navigate("CreateReview", {
            thumbnail,
            prod_id,
            prod_name: name,
            sharedID,
          })
        }
      />
      <Button
        variant="primary"
        text="Reviews"
        fontStyle={{ color: "lightgreen" }}
        style={{
          flex: 1,
          backgroundColor: Color("green").alpha(0.15).string(),
        }}
        callback={() =>
          navigation.navigate("ProductReviews", {
            prod_id,
            prod_name: name,
            reviews: reviews || [],
            sharedID,
          })
        }
      />
    </View>
  );
}
