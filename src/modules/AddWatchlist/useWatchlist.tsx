import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as HttpThunk from "@redux/Watchlist/httpThunk";
import { useAppSelector } from "utils/hooks/hooks";

interface OptionProps {
  withCheck?: boolean;
}

type States = "IN" | "NOT" | "";

export default function useWatchlist(
  prod_id: number,
  { withCheck = false }: OptionProps
) {
  const watchlistArray = useAppSelector((st) => st.watchlist.data);
  const [state, setState] = useState<States>(
    watchlistArray.findIndex((item) => item.prod_id === prod_id) !== -1
      ? "IN"
      : "NOT"
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (withCheck && prod_id !== undefined) {
      (async () => {
        const isIn = await dispatch(
          HttpThunk.checkElementStatus(prod_id)
        ).unwrap();
        setState(isIn.isIn ? "IN" : "NOT");
      })();
    }
  }, [prod_id]);

  async function appendWatchlist() {
    await dispatch(HttpThunk.addProduct(prod_id)).unwrap();
    setState("IN");
  }

  async function remove(prod_id: number) {
    await dispatch(HttpThunk.removeProduct(prod_id)).unwrap();
    setState("NOT");
  }

  return {
    appendWatchlist,
    state: watchlistArray.find((p) => p.prod_id === prod_id) ? "IN" : state,
    remove,
  };
}
