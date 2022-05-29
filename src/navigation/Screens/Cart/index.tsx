import React from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "@modules/Purchase/Purchase";
import useFetch from "@utils/hooks/useFetch";
import CartList from "@modules/CartList";
import { useAppDispatch, useAppSelector } from "@utils/hooks/hooks";
import { cartActions } from "@redux/Cart";
import useColorTheme from "@utils/context/ThemeContext";
import { notEmpty } from "@functions/typecheckers";
import Loader from "./components/Loader";
import { ProductMinified } from "/@types/types";

export default function Cart() {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const { data = [], loading } = useFetch<ProductMinified[]>("/cart", {
    invalidate: [isFocused],
    fetchOnMount: true,
    onSuccess: (data) => {
      dispatch(cartActions.setCart(data));
    },
  });

  function updateCartState(id: number) {
    dispatch(cartActions.incrementAmmount(id));
  }

  const { theme } = useColorTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {loading && notEmpty(data) && <Loader />}

      <CartList updateCartState={updateCartState} data={cart} />

      <Purchase cart={cart} />
    </View>
  );
}
