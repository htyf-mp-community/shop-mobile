import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import { useNavigationProps } from "../../@types/types";
import Ripple from "react-native-material-ripple";

interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  const navigation = useNavigation<useNavigationProps>();

  async function GetProductsByCategory() {
    navigation.navigate("SearchResults", { category });
  }
  return (
    <Ripple
      rippleColor="white"
      onPress={GetProductsByCategory}
      style={{
        backgroundColor: "#131d33",

        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        marginRight: 0,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "#fff" }}>{category}</Text>
    </Ripple>
  );
}
