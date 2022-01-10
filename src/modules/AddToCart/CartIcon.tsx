import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../constants/styles";

interface IconProps {
  loading: boolean;
  success: string;
  error: boolean;
}

const CartIcon = ({ loading, success, error }: IconProps) => {
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
    return <Ionicons name="close-outline" size={22} color={Colors.text} />;
  }
  if (success === "Added") {
    return <Ionicons name="checkmark-done" size={22} color={Colors.text} />;
  }
  return <AntDesign name="shoppingcart" size={24} color="white" />;
};

export default CartIcon;
