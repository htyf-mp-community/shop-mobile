import { useState, useEffect } from "react";
import { useUser } from "@utils/context/UserContext";
import axios from "axios";
import { SuggestionType } from "/@types/types";
import { API } from "constants/routes";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState<SuggestionType[]>([]);

  const {
    user: { token },
  } = useUser();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const delay = setTimeout(async () => {
      if (query.trim() !== "") {
        try {
          const { data } = await axios({
            method: "GET",
            headers: {
              token,
            },
            url: `${API}/products/suggestions`,
            cancelToken: cancelToken.token,
            params: {
              q: query,
            },
          });

          setSuggestion(data);
        } catch (error) {
          console.warn("./navigation/Search/Form.tsx: ", error);
        }
      }
    }, 500);

    return () => {
      cancelToken.cancel();
      clearTimeout(delay);
    };
  }, [query]);

  return { setQuery, query, suggestion };
}
