import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import RemoveProductsRepetition from "../../functions/RemoveRepetition";

interface StateProps {
  loading: boolean;
  error: string;
  data: any[];
  tries: number;
}

export default function useFetchProducts(path: string, deps: any[] = []) {
  const { user } = useUser();

  const [state, setState] = useState<StateProps>({
    loading: false,
    error: "",
    data: [],
    tries: 0,
  });

  const FetchAllProducts = useCallback(async () => {
    if (state.tries > 1)
      return setState((prev) => ({
        ...prev,
        loading: false,
        error: "Something Went Wrong",
      }));
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.get(path, {
        headers: {
          token: user.token,
        },
      });
      if (data !== null && data.message !== "Token expired") {
        const result = RemoveProductsRepetition(data);

        setState((prev) => ({ ...prev, data: result, loading: false }));
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error?.response?.data?.message || error.message,
        tries: state.tries + 1,
      }));
    }
  }, [state.error]);

  useEffect(() => {
    FetchAllProducts();
  }, deps);

  return state;
}
