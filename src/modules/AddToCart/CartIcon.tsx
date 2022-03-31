import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { IconSize } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
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
        color={theme.text}
        style={style}
      />
    );
  }
  if (success === "Added") {
    return (
      <Ionicons
        name="checkmark-done"
        size={IconSize.small}
        color={theme.text}
        style={style}
      />
    );
  }
  return (
    <Feather
      name="shopping-bag"
      size={IconSize.large}
      color={theme.text}
      style={style}
    />
  );
};

export default CartIcon;
