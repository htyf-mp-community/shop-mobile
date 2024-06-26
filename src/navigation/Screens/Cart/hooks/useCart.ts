import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { useState, useCallback } from "react";
import { cartActions } from "redux/Cart";
import useFetch from "utils/hooks/useFetch";

export function useCart() {
  const dispatch = useAppDispatch();
  const { cart, isSynced, hasMore, total } = useAppSelector(
    (state) => state.cart
  );
  const [skip, setSkip] = useState(5);

  const onSuccess = useCallback((data: any) => {
    dispatch(cartActions.setCart(data));
  }, []);

  const { loading, refetch } = useFetch("/cart", {
    invalidate: [],
    fetchOnMount: !isSynced,
    onSuccess,
  });

  const isLoading = loading && !isSynced;

  const onEndReached = useCallback(async () => {
    if (!hasMore) return;

    await refetch(undefined, { skip });

    setSkip((prev) => prev + 5);
  }, [skip, hasMore]);

  useFetch("/cart/total", {
    invalidate: [],
    fetchOnMount: true,
    onSuccess: (data: { total: number }) => {
      dispatch(cartActions.setTotal(data.total));
    },
  });

  return {
    cart,
    isLoading,
    onEndReached,
    isFetchingMore: cart.length !== 0 && loading,
    total,
  };
}
