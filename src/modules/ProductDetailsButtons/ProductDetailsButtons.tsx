import React from "react";
import { View, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";
import Button from "../../components/Button/Button";
import { ProductRatingProps, useNavigationProps } from "../../@types/types";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ProdButtonsProps {
  navigation: useNavigationProps;
  propsAdd: {
    thumbnail: string;
    prod_id: number;
    sharedID: string;
    prod_name: string;
  };
  propsRead: {
    reviews: ProductRatingProps[];
    thumbnail: string;
    prod_id: number;
    sharedID: string;
    prod_name: string;
  };
}

export default function ProductDetailsButtons({
  navigation,
  propsAdd,
  propsRead,
}: ProdButtonsProps) {
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        justifyContent: "space-around",
        marginBottom: 20,
        flexDirection: "row",
      }}
    >
      <Button
        text="Add review"
        variant="secondary"
        callback={() => navigation.navigate("CreateReview", propsAdd)}
        style={{
          width: SCREEN_WIDTH * 0.4,
          backgroundColor: Colors.primary400,
          justifyContent: "center",
        }}
      />
      <Button
        variant="primary"
        text="Ratings"
        callback={() => navigation.navigate("ProductReviews", propsRead)}
        style={{
          width: SCREEN_WIDTH * 0.4,
          justifyContent: "center",
        }}
      />
    </View>
  );
}
