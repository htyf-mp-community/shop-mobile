import React from "react";
import { View, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";
import Button from "../../components/Button/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ProdButtonsProps {
  navigation: any;
  propsAdd: {
    thumbnail: string;
    prod_id: number;
    sharedID: string;
    prod_name: string;
  };
  propsRead: {
    reviews: any[];
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
        callback={() => navigation.navigate("CreateReview", propsAdd)}
        style={{
          width: SCREEN_WIDTH * 0.4,
          backgroundColor: Colors.secondary,
          color: Colors.text,
          justifyContent: "center",
        }}
      />
      <Button
        text="Ratings"
        callback={() => navigation.navigate("ProductReviews", propsRead)}
        style={{
          width: SCREEN_WIDTH * 0.4,
          backgroundColor: Colors.ternary,
          color: Colors.text,
          justifyContent: "center",
        }}
      />
    </View>
  );
}
