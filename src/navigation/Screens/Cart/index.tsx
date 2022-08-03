import React, { useLayoutEffect } from "react";
import { View, Text, Alert } from "react-native";
import Purchase from "navigation/Screens/Cart/Purchase/Purchase";
import CartList from "navigation/Screens/Cart/CartList";
import useColorTheme from "@utils/context/ThemeContext";
import { useCart } from "./useCart";
import { ScreenNavigationProps } from "/@types/types";
import Ripple from "react-native-material-ripple";

export default function Cart({ navigation }: ScreenNavigationProps<"Cart">) {
  const { theme } = useColorTheme();
  const {
    cart,
    isLoading,
    onEndReached,
    remove: removeAllProductsFromCartAsync,
  } = useCart();

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <Ripple
          style={{ paddingHorizontal: 15 }}
          onPress={() => {
            // removes all products from cart
            Alert.alert(
              "Are you sure you want to remove all products from cart?",
              "Action cannot be undone",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Confirm",
                  onPress: () => removeAllProductsFromCartAsync(0, true),
                  style: "destructive",
                },
              ]
            );
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Remove All</Text>
        </Ripple>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <CartList isLoading={isLoading} onEndReached={onEndReached} data={cart} />
      <Purchase cart={cart} />
    </View>
  );
}
