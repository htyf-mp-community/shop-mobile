import { useRef, useState } from "react";
import { useUser } from "@utils/context/UserContext";
import axios from "axios";
import { ENDPOINTS } from "@constants/routes";
import useDelay from "utils/hooks/useDelay";
import { useDispatch } from "react-redux";
import { cartActions } from "redux/Cart";
import { CartProps } from "/@types/types";

type ResultType = "Added" | "";

interface CartResponse {
  statusCode: 200 | 201 | 400 | 500;
  message: string;

  product: CartProps;
}

export default function useCart(prod_id?: number) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState<ResultType>("");
  const dispatch = useDispatch();

  const cancelToken = useRef(axios.CancelToken.source());

  function cancelRequest() {
    cancelToken.current.cancel();
  }

  async function addToCartAsync() {
    try {
      setLoading(true);

      const { data, status } = await axios.post<CartResponse>(
        ENDPOINTS.cartAdd,
        { prod_id },
        {
          cancelToken: cancelToken.current.token,
          headers: {
            token: user.token,
          },
        }
      );

      if (data !== null && status === 201) {
        dispatch(cartActions.appendCart(data.product));

        setResult("Added");
      }

      return data;
    } catch (error: any) {
      setError(error?.["message"]);
    } finally {
      setLoading(false);
    }
  }

  useDelay(() => setResult(""), 3000, [addToCartAsync]);

  return { pushToCart: addToCartAsync, loading, error, result, cancelRequest };
}
