import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import Purchase from "navigation/Screens/Cart/Purchase/Purchase";
import CartList from "navigation/Screens/Cart/CartList";
import useColorTheme from "@utils/context/ThemeContext";
import Loader from "./components/Loader";
import { useCart } from "./useCart";
import { ScreenNavigationProps } from "/@types/types";
import Ripple from "react-native-material-ripple";

export default function Cart({ navigation }: ScreenNavigationProps<"Cart">) {
  const { theme } = useColorTheme();
  const { cart, isLoading, onEndReached } = useCart();

  // To be done later

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <Ripple style={{ paddingHorizontal: 15 }}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Remove All</Text>
        </Ripple>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {isLoading && <Loader />}

      <CartList onEndReached={onEndReached} data={cart} />

      <Purchase cart={cart} />
    </View>
  );
}
