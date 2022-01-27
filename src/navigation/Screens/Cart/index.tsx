import React from "react";
import { View } from "react-native";
import { ProductTypeProps } from "../../../modules/Product/Product";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../../modules/Purchase/Purchase";
import useFetch from "../../../hooks/useFetch";
import CartList from "../../../modules/CartList";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { cartActions } from "../../../redux/Cart";
import useColorTheme from "../../../context/ThemeContext";

export default function Cart() {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  useFetch<ProductTypeProps[]>("/cart", [isFocused], [], (state) => {
    dispatch(cartActions.setCart(state));
  });

  function updateCartState(id: number) {
    dispatch(cartActions.incrementAmmount(id));
  }

  const { theme } = useColorTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <CartList updateCartState={updateCartState} data={cart} />
      <Purchase cart={cart} />
    </View>
  );
}
