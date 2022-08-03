import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { useState, useCallback } from "react";
import { cartActions } from "redux/Cart";
import useFetch from "utils/hooks/useFetch";
import axios from "axios";
import { useUser } from "utils/context/UserContext";
import { API } from "@constants/routes";

export function useCart() {
  const dispatch = useAppDispatch();
  const { cart, isSynced, hasMore } = useAppSelector((state) => state.cart);
  const { user } = useUser();
  const [skip, setSkip] = useState(5);

  const onSuccess = useCallback(
    (data) => {
      dispatch(cartActions.setCart(data));
    },
    [cart]
  );

  const { loading, refetch } = useFetch("/cart", {
    invalidate: [],
    fetchOnMount: !isSynced,
    onSuccess,
  });

  const isLoading = loading && cart.length === 0;

  const onEndReached = useCallback(async () => {
    if (!hasMore) return;

    await refetch(undefined, { skip });

    setSkip((prev) => prev + 5);
  }, [skip, hasMore]);

  async function removeProductFromCartAsync(
    cart_id: number,
    removeAllProducts?: boolean
  ) {
    try {
      const { data, status } = await axios.delete(`${API}/cart`, {
        headers: {
          token: user.token,
        },
        params: {
          id: cart_id,
          ...(!!removeAllProducts && { removeAll: true }),
        },
      });

      if (removeAllProducts && status === 200) {
        dispatch(cartActions.clearCart());
      } else if (data.message === "Deleted" || status === 200) {
        dispatch(cartActions.removeById(cart_id));
      }

      return data;
    } catch (error) {
      console.warn(error);
    }
  }

  return { cart, isLoading, onEndReached, remove: removeProductFromCartAsync };
}
