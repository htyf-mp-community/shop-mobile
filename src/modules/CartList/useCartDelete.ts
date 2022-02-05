import axios from "axios";
import { useUser } from "@context/UserContext";
import { API } from "@constants/routes";
import { useAppDispatch } from "@hooks/hooks";
import { cartActions } from "@redux/Cart";
import mode from "@constants/settings";

export default function useCartDelete() {
  const { user } = useUser();

  const dispatch = useAppDispatch();

  async function RemoveCartProduct(cart_id: number) {
    try {
      const { data } = await axios.delete(`${API}/cart`, {
        headers: {
          token: user.token,
        },
        params: {
          id: cart_id,
        },
      });

      if (data.status === "Deleted") {
        dispatch(cartActions.removeById(cart_id));
      }
    } catch (error) {
      mode === "dev" && console.warn(error);
    }
  }

  return RemoveCartProduct;
}
