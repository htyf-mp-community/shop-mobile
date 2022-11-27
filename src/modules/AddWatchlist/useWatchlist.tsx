import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as HttpThunk from "@redux/Watchlist/httpThunk";

interface OptionProps {
  withCheck?: boolean;
}

type States = "IN" | "NOT" | "";

export default function useWatchlist(
  prod_id: number,
  { withCheck = false }: OptionProps
) {
  const [state, setState] = useState<States>("");
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (withCheck && prod_id !== undefined) {
      (async () => {
        const isIn = await dispatch(
          HttpThunk.checkElementStatus(prod_id)
        ).unwrap();

        // console.log({ prod_id, ...isIn });

        setState(isIn.isIn ? "IN" : "NOT");
      })();
    }
  }, [prod_id]);

  async function appendWatchlist() {
    // try {
    //   const { data } = await http().post(`/watchlist`, { prod_id });

    //   dispatch(watchlistActions.updateWatchlist(data.product));
    //   setState("IN");
    // } catch (error) {
    //   setState("NOT");
    // }
    await dispatch(HttpThunk.addProduct(prod_id)).unwrap();
    setState("IN");
  }

  async function remove(prod_id: number) {
    // try {
    //   await http().delete(`${API}/watchlist/${prod_id}`);
    //   dispatch(watchlistActions.removeElement(prod_id));
    //   setState("NOT");
    // } catch (error) {}

    await dispatch(HttpThunk.removeProduct(prod_id)).unwrap();
    setState("NOT");
  }

  return { appendWatchlist, state, remove };
}
