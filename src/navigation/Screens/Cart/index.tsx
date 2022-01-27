import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import { ProductTypeProps } from "../../../modules/Product/Product";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../../modules/Purchase/Purchase";
import useFetch from "../../../hooks/useFetch";
import CartList from "../../../modules/CartList";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { cartActions } from "../../../redux/Cart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

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

  return (
    <View style={styles.container}>
      <CartList updateCartState={updateCartState} data={cart} />
      <Purchase cart={cart} />
    </View>
  );
}
