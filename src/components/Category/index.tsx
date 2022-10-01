import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { useAppDispatch } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";

interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  async function GetProductsByCategory() {
    dispatch(searchActions.setFilter({ key: "category", value: category }));

    navigation.navigate("Search");
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
