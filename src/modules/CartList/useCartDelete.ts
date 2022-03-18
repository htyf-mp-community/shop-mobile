import axios from "axios";
import { useUser } from "@utils/context/UserContext";
import { API } from "@constants/routes";
import { useAppDispatch } from "utils/hooks/hooks";
import { cartActions } from "@redux/Cart";
import mode from "@constants/settings";

export default function useCartDelete() {
  const { user } = useUser();

  const dispatch = useAppDispatch();

  async function RemoveCartProduct(cart_id: number) {
    try {
      const { data, status } = await axios.delete(`${API}/cart`, {
        headers: {
          token: user.token,
        },
        params: {
          id: cart_id,
        },
      });

      if (data.message === "Deleted" || status === 200) {
        dispatch(cartActions.removeById(cart_id));
      }
    } catch (error) {
      mode === "dev" && console.warn(error);
    }
  }

  return RemoveCartProduct;
}
