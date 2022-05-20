import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API } from "@constants/routes";
import { useUser } from "@utils/context/UserContext";
import { notUndefined } from "@functions/typecheckers";

interface StateProps<T> {
  data: T | undefined;
  loading: boolean;
  error: string;
}

interface SettingsProps<T> {
  invalidate?: any[];
  fetchOnMount?: boolean;
  onSuccess?: (
    data: T,
    setState: React.Dispatch<React.SetStateAction<StateProps<T>>>
  ) => void;
  onError?: (error: unknown) => void;
}

const DEFAULT_OPTIONS = {
  invalidate: [],
  fetchOnMount: true,
};

export default function useFetch<T>(
  path: string,
  options: SettingsProps<T> = DEFAULT_OPTIONS
) {
  const mounted = useRef(false);
  const [state, setState] = useState<StateProps<T>>({
    data: undefined,
    loading: false,
    error: "",
  });

  const { user } = useUser();

  async function query(cancelToken?: any, searchOptions?: Object) {
    setState((p) => ({
      ...p,
      loading: true,
    }));
    try {
      if (mounted.current === false) return;
      const { data } = await axios.get(API + path, {
        headers: {
          token: user.token,
        },
        params: {
          ...searchOptions,
        },
        cancelToken: cancelToken.token,
      });

      if (!!options.onSuccess && mounted.current) {
        options?.onSuccess?.(data, setState);
      } else if (mounted.current) {
        setState({
          loading: false,
          data: data,
          error: "",
        });
      }
    } catch (error: any) {
      if (!!options.onError) {
        options.onError(error);
      }

      if (!axios.isCancel(error) && mounted.current) {
        setState((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
          loading: false,
        }));
      }
    }
  }

  useEffect(() => {
    if (!options.fetchOnMount) return;

    mounted.current = true;
    const cancelToken = axios.CancelToken.source();

    query(cancelToken);

    return () => {
      mounted.current = false;
      cancelToken.cancel();
    };
  }, options.invalidate);

  return { ...state, setState, refetch: query };
}
