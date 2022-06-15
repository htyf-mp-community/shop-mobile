import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Purchase from "@modules/Purchase/Purchase";
import useFetch from "@utils/hooks/useFetch";
import CartList from "@modules/CartList";
import { useAppDispatch, useAppSelector } from "@utils/hooks/hooks";
import { cartActions } from "@redux/Cart";
import useColorTheme from "@utils/context/ThemeContext";
import { notEmpty } from "@functions/typecheckers";
import Loader from "./components/Loader";
import { ProductMinified } from "/@types/types";
import axios from "axios";
import RemoveProductsRepetition from "functions/RemoveRepetition";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { cart, isSynced } = useAppSelector((state) => state.cart);

  const [skip, setSkip] = useState(0);

  const onSuccess = useCallback(
    (data) => {
      dispatch(
        cartActions.setCart(
          RemoveProductsRepetition([...cart, ...data], "cart_id")
        )
      );
    },
    [cart]
  );

  const {
    data = [],
    loading,
    refetch,
  } = useFetch<ProductMinified[]>("/cart", {
    invalidate: [],
    fetchOnMount: cart.length === 0 || !isSynced,
    onSuccess,
  });

  const { theme } = useColorTheme();

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    refetch(cancelToken, { skip });

    return () => {
      cancelToken.cancel();
    };
  }, [skip]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {loading && notEmpty(data) && <Loader />}

      <CartList onEndReached={() => setSkip(skip + 5)} data={cart} />

      <Purchase cart={cart as any} />
    </View>
  );
}
