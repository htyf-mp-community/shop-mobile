import axios from "axios";
import { API } from "constants/routes";
import { useState, useCallback, useEffect } from "react";
import { useUser } from "utils/context/UserContext";

import RemoveProductsRepetition from "functions/RemoveRepetition";

export default function useInfiniteScrolling<T>(path: `/${string}`) {
  const { user } = useUser();

  const [state, setState] = useState({
    loading: false,
    error: "",
    data: [] as T[],
    hasMore: false,
  });

  const [skip, setSkip] = useState(0);

  const onSkip = useCallback(async () => {
    if (state.hasMore) {
      setSkip(skip + 5);
    }
  }, [skip, state.hasMore]);

  const fetchData = async () => {
    let cancelToken = axios.CancelToken.source();

    try {
      setState((prev) => ({ ...prev, loading: true }));

      const { data } = await axios.get(`${API}${path}`, {
        headers: {
          token: user.token,
        },
        params: {
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (data !== undefined && data.message !== "Token expired") {
        setState((prev) => ({
          ...prev,
          hasMore: data.hasMore,
          data: RemoveProductsRepetition([...prev.data, ...data.results]),
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

    return () => cancelToken.cancel();
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  return {
    ...state,
    fetchData,
    onSkip,
  };
}
