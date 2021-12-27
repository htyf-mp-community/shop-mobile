import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { API } from "../../constants/routes";
import { Colors } from "../../constants/styles";
import { useUser } from "../../context/UserContext";

type CategoryProps = {
  category: string;
};

/**
 * @param {String} category text displayed inside component
 **/

export default function Category({ category, ...rest }: CategoryProps) {
  const navigation = useNavigation<any>();
  const { user } = useUser();

  async function GetProductsByCategory() {
    try {
      const { data } = await axios.get(`${API}/products/category/${category}`, {
        headers: {
          token: user.token,
        },
      });
      navigation.navigate("SearchResults", {
        result: data,
        length: data.length,
      });
    } catch (error) {}
  }

  return (
    <TouchableOpacity
      onPress={GetProductsByCategory}
      style={{
        backgroundColor: Colors.primary100,
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}
      {...rest}
    >
      <Text style={{ color: "#fff" }}>{category}</Text>
    </TouchableOpacity>
  );
}
