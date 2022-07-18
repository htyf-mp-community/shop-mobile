import axios from "axios";
import { API } from "constants/routes";
import { useEffect, useState } from "react";
import { useUser } from "@utils/context/UserContext";
import { useDispatch } from "react-redux";
import { watchlistActions } from "redux/Watchlist/Watchlist";

interface OptionProps {
  withCheck?: boolean;
}

type States = "IN" | "NOT" | "";

export default function useWatchlist(
  prod_id: number,
  { withCheck = false }: OptionProps
) {
  const [state, setState] = useState<States>("");
  const { user } = useUser();

  useEffect(() => {
    if (withCheck && prod_id !== undefined) {
      (async () => {
        try {
          const { data } = await axios.post(
            `${API}/watchlist/check`,
            { prod_id },
            {
              headers: { token: user.token },
            }
          );

          setState(() => (data.isIn ? "IN" : "NOT"));
        } catch (error: any) {}
      })();
    }
  }, [prod_id]);

  const dispatch = useDispatch();

  async function appendWatchlist() {
    try {
      const { data } = await axios.post(
        `${API}/watchlist`,
        { prod_id },
        {
          headers: {
            token: user.token,
          },
        }
      );

      dispatch(watchlistActions.updateWatchlist(data.product));
      setState("IN");
    } catch (error) {
      setState("IN");
      console.log(error);
    }
  }

  async function remove(prod_id: number) {
    await axios.delete(`${API}/watchlist/${prod_id}`, {
      headers: {
        token: user.token,
      },
    });
    dispatch(watchlistActions.removeElement(prod_id));
  }

  return { appendWatchlist, state, remove };
}
