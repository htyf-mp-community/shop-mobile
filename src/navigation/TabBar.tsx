import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface OptionProps {
  name: string;
  text: string;
  route: string;
  navigation: any;
}

const Option = ({ name, text, route, navigation }: OptionProps) => {
  const active = true;

  return (
    <TouchableOpacity
      style={styles.touch}
      onPress={() => navigation.navigate(route)}
    >
      <FontAwesome5 name={name} size={25} color={Colors.primary100} />
      <Text style={{ color: "white" }}>{active ? text : ""}</Text>
    </TouchableOpacity>
  );
};

export default function TabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.container}>
      <Option name="home" text="home" navigation={navigation} route="Home" />
      <Option
        name="shopping-basket"
        text="cart"
        navigation={navigation}
        route="Cart"
      />
      <Option name="user" text="user" navigation={navigation} route="User" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 60,
    backgroundColor: "#2b2b2b",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  touch: {
    alignItems: "center",
  },
});
