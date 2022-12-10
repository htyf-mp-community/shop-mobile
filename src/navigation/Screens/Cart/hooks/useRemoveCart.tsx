import { useDispatch } from "react-redux";
import axios from "axios";
import { API } from "constants/routes";
import { cartActions } from "redux/Cart";
import { useUser } from "utils/context/UserContext";
import { useState } from "react";

export default function useRemoveCart() {
  const dispatch = useDispatch();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  async function removeProductFromCartAsync(
    cart_id: number,
    removeAllProducts?: boolean
  ) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  const removeAllProductsFromCartAsync = () =>
    removeProductFromCartAsync(0, true);

  return {
    remove: removeProductFromCartAsync,
    loading,
    removeAll: removeAllProductsFromCartAsync,
  };
}
