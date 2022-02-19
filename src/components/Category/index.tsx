import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigationProps } from "../../@types/types";
import { API } from "../../constants/routes";
import { Colors } from "../../constants/styles";
import { useUser } from "@utils/context/UserContext";
import Ripple from "react-native-material-ripple";

type CategoryProps = {
  category: string;
};

/**
 * @param {String} category text displayed inside component
 **/

export default function Category({ category, ...rest }: CategoryProps) {
  const navigation = useNavigation<useNavigationProps>();
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
    <Ripple
      rippleColor="white"
      onPress={GetProductsByCategory}
      style={{
        backgroundColor: Colors.primary100,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        marginRight: 0,
        borderRadius: 5,
      }}
      {...rest}
    >
      <Text style={{ color: "#fff" }}>{category}</Text>
    </Ripple>
  );
}
