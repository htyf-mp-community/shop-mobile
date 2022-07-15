import axios, { CancelTokenSource } from "axios";
import { useEffect, useRef, useState } from "react";
import { API } from "@constants/routes";
import { useUser } from "@utils/context/UserContext";

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
  ) => any;
  onError?: (error: unknown) => any;
}

const DEFAULT_OPTIONS = {
  invalidate: [],
  fetchOnMount: true,
};

export default function useFetch<T>(path: `/${string}`, opt: SettingsProps<T>) {
  const options = Object.freeze({ ...DEFAULT_OPTIONS, ...opt });

  const mounted = useRef(false);
  const [state, setState] = useState<StateProps<T>>({
    data: undefined,
    loading: false,
    error: "",
  });

  const { user } = useUser();

  async function query(
    cancelToken?: CancelTokenSource,
    searchOptions?: Object
  ) {
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
        cancelToken: cancelToken?.token,
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

      return data as T;
    } catch (error: any) {
      if (!!options.onError) {
        options.onError(error);
      }

      if (!axios.isCancel(error) && mounted.current) {
        setState((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
        }));
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  type MutateMethods = "put" | "post" | "delete";

  async function mutate(
    httpMethod: MutateMethods,
    url: `/${string}`,
    data = {},
    callback: (arg: [T, any]) => any
  ) {
    return axios({
      baseURL: API + url,
      method: httpMethod,
      headers: {
        token: user.token,
      },
      data,
    }).then(({ data: response }) => {
      setState((prev) => ({
        ...prev,
        data: callback([state.data!, response]),
      }));
    });
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

  return { ...state, setState, refetch: query, mutate };
}
