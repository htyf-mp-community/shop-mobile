import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { useAppDispatch } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";
import { Colors } from "constants/styles";

interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  async function onCategoryPress() {
    dispatch(searchActions.setFilter({ key: "category", value: category }));

    navigation.navigate("Search");
  }
  return (
    <Ripple
      rippleColor="white"
      onPress={onCategoryPress}
      style={{
        backgroundColor: Colors.primary_light,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        marginRight: 0,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "#fff" }}>{category}</Text>
    </Ripple>
  );
}
