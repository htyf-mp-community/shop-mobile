import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";

interface IconProps {
  loading: boolean;
  success: string;
  error: boolean;

  style?: StyleProp<ViewStyle & TextStyle>;
}

const CartIcon = ({ loading, success, error, style }: IconProps) => {
  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color={Colors.text}
        style={{ padding: 2 }}
      />
    );
  }
  if (error) {
    return (
      <Ionicons
        name="close-outline"
        size={22}
        color={Colors.text}
        style={style}
      />
    );
  }
  if (success === "Added") {
    return (
      <Ionicons
        name="checkmark-done"
        size={22}
        color={Colors.text}
        style={style}
      />
    );
  }
  return (
    <Feather name="shopping-bag" size={24} color={Colors.text} style={style} />
  );
};

export default CartIcon;
