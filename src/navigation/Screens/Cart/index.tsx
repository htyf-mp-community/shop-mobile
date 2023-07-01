import React, { useLayoutEffect, useRef, useEffect } from "react";
import { View, Text, Alert, VirtualizedList } from "react-native";
import Purchase from "navigation/Screens/Cart/Purchase/Purchase";
import CartList from "navigation/Screens/Cart/CartList";
import useColorTheme from "@utils/context/ThemeContext";
import { useCart } from "./hooks/useCart";
import { ScreenNavigationProps } from "/@types/types";
import useRemoveCart from "./hooks/useRemoveCart";
import { IconButton } from "components";
import { Feather } from "@expo/vector-icons";

export default function Cart({
  navigation,
  route,
}: ScreenNavigationProps<"Cart">) {
  const { theme } = useColorTheme();
  const { cart, ...restUseCartProps } = useCart();

  const { removeAll } = useRemoveCart();

  const clearCart = () =>
    Alert.alert(
      "Are you sure you want to remove all products from cart?",
      "Action cannot be undone",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: removeAll,
          style: "destructive",
        },
      ]
    );

  const cartListRef = useRef<VirtualizedList<any> | null>(null);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: `Cart (${cart.length})`,
      headerTitleAlign: "center",
      headerRight: () =>
        cart.length > 0 ? (
          <IconButton
            hideBackground
            onPress={clearCart}
            icon={<Feather name="trash" size={20} color="white" />}
          />
        ) : null,
    });
  }, [cart.length]);

  // useEffect(() => { doesnt work
  //   if (
  //     route.params?.scrollToProductOnOpen &&
  //     route.params?.selectedProductId
  //   ) {
  //     const productPos = cart.findIndex(
  //       (item) => item.prod_id === route.params.selectedProductId
  //     );

  //     if (productPos !== -1) {
  //       console.log("SCROLLED ");

  //       const offset = 131 * (productPos + 1);

  //       console.log(productPos, offset);

  //       cartListRef.current?.scrollToOffset({
  //         offset,
  //         animated: true,
  //       });
  //     }
  //   }
  // }, [cart, route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <CartList ref={cartListRef} data={cart} {...restUseCartProps} />
      <Purchase cart={cart} />
    </View>
  );
}
