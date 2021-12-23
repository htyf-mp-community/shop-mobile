import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import RemoveProductsRepetition from "../../functions/RemoveRepetition";

interface StateProps<T> {
  loading: boolean;
  error: string;
  data: T[];
  hasMore: boolean;
}

export interface Product {
  prod_id: number;
  price: number;
  discount_price: number | null | undefined;
  title: string;
  expiration_date: string;
  description: string;
  category: string;
  img_id: {
    id: number;
    name: string;
  }[];
  rating_id: {
    rating_id: number;
    user_id: number;
    rating: number;
    title: string;
    description: string;
  }[];
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
