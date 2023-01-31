import { useState, useCallback, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { useUser } from "@utils/context/UserContext";
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
    loading: true,
    error: "",
    data: [],
    hasMore: false,
  });

  const FetchAllProducts = useCallback(
    async (url?: string | undefined, cancelToken?: CancelTokenSource) => {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        const finalUrl = typeof url === "undefined" ? path : url;

        const { data } = await axios.get<Response>(finalUrl, {
          headers: {
            token: user.token,
          },
          cancelToken: cancelToken?.token,
        });

        if (data !== undefined && data.message !== "Token expired") {
          setState((prev) => ({
            ...prev,
            hasMore: data.hasMore,
            data: RemoveProductsRepetition(
              [...prev.data, ...data.results],
              "prod_id"
            ),
          }));
        }
      } catch (error: any) {
        setState((prev) => ({
          ...prev,

          error: error?.response?.data?.message || error.message,
        }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [state.error]
  );

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();

    FetchAllProducts(undefined, cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, deps);

  return { ...state, FetchAllProducts };
}
