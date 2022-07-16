import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Purchase from "@modules/Purchase/Purchase";
import useFetch from "@utils/hooks/useFetch";
import CartList from "@modules/CartList";
import { useAppDispatch, useAppSelector } from "@utils/hooks/hooks";
import { cartActions } from "@redux/Cart";
import useColorTheme from "@utils/context/ThemeContext";
import Loader from "./components/Loader";
import axios from "axios";
import removeRepetition from "functions/RemoveRepetition";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { cart, isSynced } = useAppSelector((state) => state.cart);

  const [skip, setSkip] = useState(0);

  const onSuccess = useCallback(
    (data) =>
      dispatch(
        cartActions.setCart(removeRepetition([...cart, ...data], "cart_id"))
      ),
    [cart]
  );

  const { loading, refetch } = useFetch("/cart", {
    invalidate: [],
    fetchOnMount: !isSynced,
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

  const isLoading = loading && cart.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {isLoading && <Loader />}

      <CartList onEndReached={() => setSkip(skip + 5)} data={cart} />

      <Purchase cart={cart} />
    </View>
  );
}
