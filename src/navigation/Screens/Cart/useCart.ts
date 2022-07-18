import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import axios from "axios";
import removeRepetition from "functions/RemoveRepetition";
import { useState, useCallback, useEffect } from "react";
import { cartActions } from "redux/Cart";
import useFetch from "utils/hooks/useFetch";

export function useCart() {
  const dispatch = useAppDispatch();
  const { cart, isSynced } = useAppSelector((state) => state.cart);

  const [skip, setSkip] = useState(0);

  const onSuccess = useCallback(
    (data) =>
      dispatch(
        //  cartActions.setCart(removeRepetition([...cart, ...data], "cart_id"))
        cartActions.setCart([...cart, ...data])
      ),
    [cart]
  );

  const { loading, refetch } = useFetch("/cart", {
    invalidate: [],
    fetchOnMount: !isSynced,
    onSuccess,
  });

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    refetch(cancelToken, { skip });

    return () => {
      cancelToken.cancel();
    };
  }, [skip]);

  const isLoading = loading && cart.length === 0;

  function onEndReached() {
    if (!isSynced) setSkip((prev) => prev + 5);
  }

  return { cart, isLoading, onEndReached };
}
