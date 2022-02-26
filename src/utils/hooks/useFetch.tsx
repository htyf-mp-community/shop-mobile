import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API } from "@constants/routes";
import { useUser } from "@utils/context/UserContext";
import { notUndefined } from "@functions/typecheckers";

interface StateProps<T> {
  data: T;
  loading: boolean;
  error: string;
}

export default function useFetch<T>(
  path: string,
  deps: any[] = [],
  defaultValue?: any,
  setter?: (arg: T) => void
) {
  const mounted = useRef(false);
  const [state, setState] = useState<StateProps<T>>({
    data: defaultValue,
    loading: false,
    error: "",
  });

  const { user } = useUser();

  useEffect(() => {
    mounted.current = true;
    const cancelToken = axios.CancelToken.source();

    (async () => {
      setState((p) => ({ ...p, loading: true }));
      try {
        if (mounted.current === false) return;
        const { data } = await axios.get(API + path, {
          headers: {
            token: user.token,
          },
          cancelToken: cancelToken.token,
        });
        if (notUndefined(setter) && mounted.current) {
          setter?.(data);
        } else {
          if (mounted.current) {
            setState({
              loading: false,
              data: data,
              error: "",
            });
          }
        }
      } catch (error: any) {
        if (!axios.isCancel(error) && mounted.current) {
          setState((p) => ({
            ...p,
            error: error?.response?.data?.message || error.message,
            loading: false,
          }));
        }
      }
    })();

    return () => {
      mounted.current = false;
      cancelToken.cancel();
    };
  }, deps);

  return { ...state, setState };
}
