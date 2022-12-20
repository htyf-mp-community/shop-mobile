import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeCartProduct } from "redux/Cart/CartHttp";

export default function useRemoveCart() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function removeProductFromCartAsync(
    cart_id: number,
    removeAllProducts = false
  ) {
    setLoading(true);
    try {
      dispatch(
        removeCartProduct({
          cart_id: cart_id,
          removeAll: removeAllProducts,
        })
      );
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
