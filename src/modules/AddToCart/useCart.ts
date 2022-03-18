import { useState } from "react";
import { useUser } from "@utils/context/UserContext";
import axios from "axios";
import { ENDPOINTS } from "../../constants/routes";
import useDelay from "utils/hooks/useDelay";

export default function useCart(
  prod_id: number,
  refetch: () => void = () => {}
) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState("");

  async function PushToCart() {
    try {
      setLoading(true);

      const { data, status } = await axios.post(
        ENDPOINTS.cartAdd,
        { prod_id },
        {
          headers: {
            token: user.token,
          },
        }
      );
      if (data !== null && status === 201) {
        setResult(data.status);
        setLoading(false);
        refetch();
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  useDelay(
    () => {
      setResult("");
    },
    3000,
    [PushToCart]
  );

  return { pushToCart: PushToCart, loading, error, result };
}
