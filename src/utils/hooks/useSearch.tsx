import { useState, useEffect } from "react";
import { useUser } from "@utils/context/UserContext";
import axios from "axios";
import { SuggestionType } from "/@types/types";
import { API } from "constants/routes";
import useRecent from "navigation/Screens/Search/hooks/useRecent";

export default function useSearch(params: {
  title?: string;
  price?: string;
  category?: string;
}) {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState<SuggestionType[]>([]);

  const {
    user: { token },
  } = useUser();

  const { recent, appendRecent } = useRecent();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const delay = setTimeout(async () => {
      if (query.trim() !== "") {
        try {
          appendRecent(query);
          const { data } = await axios({
            method: "GET",
            headers: {
              token,
            },
            url: `${API}/products/suggestions`,
            cancelToken: cancelToken.token,
            params: {
              q: query,
              ...params,
            },
          });

          setSuggestion(data);
        } catch (error: any) {}
      }
    }, 500);

    return () => {
      cancelToken.cancel();
      clearTimeout(delay);
    };
  }, [query, params]);

  return { setQuery, query, suggestion, recent };
}
