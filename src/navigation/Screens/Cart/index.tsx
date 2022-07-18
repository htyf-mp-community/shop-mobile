import React from "react";
import { View } from "react-native";
import Purchase from "navigation/Screens/Cart/Purchase/Purchase";
import CartList from "navigation/Screens/Cart/CartList";
import useColorTheme from "@utils/context/ThemeContext";
import Loader from "./components/Loader";
import { useCart } from "./useCart";

export default function Cart() {
  const { theme } = useColorTheme();

  const { cart, isLoading, onEndReached } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {isLoading && <Loader />}

      <CartList onEndReached={onEndReached} data={cart} />

      <Purchase cart={cart} />
    </View>
  );
}
