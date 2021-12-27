import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import RemoveProductsRepetition from "../../functions/RemoveRepetition";
import { Product } from "../../@types/types";

interface StateProps<T> {
  loading: boolean;
  error: string;
  data: T[];
  hasMore: boolean;
}

interface Response {
  hasMore: boolean;
  results: Product[];
  message?: string;
}

export default function useFetchProducts<T>(path: string, deps: any[] = []) {
  const { user } = useUser();

  const [state, setState] = useState<StateProps<T>>({
    loading: false,
    error: "",
    data: [],
    hasMore: false,
  });

  const FetchAllProducts = useCallback(
    async (url?: string | undefined) => {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        const finalUrl = typeof url === "undefined" ? path : url;

        const { data } = await axios.get<Response>(finalUrl, {
          headers: {
            token: user.token,
          },
        });

        if (data !== undefined && data.message !== "Token expired") {
          const result = RemoveProductsRepetition(data?.results);

          setState((prev: any) => ({
            ...prev,
            hasMore: data.hasMore,
            data: [...prev.data, ...result],
            loading: false,
          }));
        }
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error?.response?.data?.message || error.message,
        }));
      }
    },
    [state.error]
  );

  useEffect(() => {
    FetchAllProducts();
  }, deps);

  return { ...state, FetchAllProducts };
}
