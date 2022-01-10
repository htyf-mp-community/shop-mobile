import React from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";

export default function useCartDelete(setDeleted: (e: any) => void) {
  const { user } = useUser();

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
        setDeleted((deleted: number) => deleted + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return RemoveCartProduct;
}
