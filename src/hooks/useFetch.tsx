import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../constants/routes";
import { useUser } from "../context/UserContext";

interface StateProps<T> {
  data: T | T[];
  loading: boolean;
  error: string;
}

export default function useFetch<DataType>(path: string, deps: any[] = []) {
  const [state, setState] = useState<StateProps<DataType>>({
    data: [],
    loading: false,
    error: "",
  });

  const { user } = useUser();

  useEffect(() => {
    (async () => {
      setState((p) => ({ ...p, loading: true }));
      try {
        const { data } = await axios.get(API + path, {
          headers: {
            token: user.token,
          },
        });
        setState({
          loading: false,
          data: data,
          error: "",
        });
      } catch (error: any) {
        setState((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
          loading: false,
        }));
      }
    })();
  }, deps);

  return state;
}
