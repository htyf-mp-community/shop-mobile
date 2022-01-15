import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../constants/routes";
import { useUser } from "../context/UserContext";

interface StateProps<T> {
  data: T;
  loading: boolean;
  error: string;
}

export default function useFetch<T>(
  path: string,
  deps: any[] = [],
  defaultValue?: any
) {
  const [state, setState] = useState<StateProps<T>>({
    data: defaultValue,
    loading: false,
    error: "",
  });

  const { user } = useUser();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async () => {
      setState((p) => ({ ...p, loading: true }));
      try {
        const { data } = await axios.get(API + path, {
          headers: {
            token: user.token,
          },
          cancelToken: cancelToken.token,
        });
        setState({
          loading: false,
          data: data,
          error: "",
        });
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          setState((p) => ({
            ...p,
            error: error?.response?.data?.message || error.message,
            loading: false,
          }));
        }
      }
    })();

    return () => {
      cancelToken.cancel();
    };
  }, deps);

  return state;
}
