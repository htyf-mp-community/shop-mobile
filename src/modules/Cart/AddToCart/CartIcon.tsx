import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { IconSize } from "@constants/styles";
import useColorTheme from "utils/context/ThemeContext";

interface IconProps {
  loading: boolean;
  success: string;
  error: boolean;

  style?: StyleProp<ViewStyle & TextStyle>;
}

const CartIcon = ({ loading, success, error, style }: IconProps) => {
  const { theme } = useColorTheme();
  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color={theme.text}
        style={{ padding: 2 }}
      />
    );
  }
  if (error) {
    return (
      <Ionicons
        name="close-outline"
        size={IconSize.small}
        color="white"
        style={style}
      />
    );
  }
  if (success === "Added") {
    return (
      <Ionicons
        name="checkmark-done"
        size={IconSize.small}
        color="white"
        style={style}
      />
    );
  }
  return (
    <Ionicons name="cart" size={IconSize.large} color="white" style={style} />
  );
};

export default CartIcon;
