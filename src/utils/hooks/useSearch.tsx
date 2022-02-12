import { useState, useEffect } from "react";
import { useUser } from "@utils/context/UserContext";
import axios from "axios";
import { SuggestionType } from "/@types/types";
import { API } from "constants/routes";

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

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const delay = setTimeout(async () => {
      if (query.trim() !== "") {
        console.log("query");
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
              ...params,
            },
          });

          setSuggestion(data);
        } catch (error: any) {
          console.warn("./navigation/Search/Form.tsx: ", error?.response?.data);
        }
      }
    }, 500);

    return () => {
      cancelToken.cancel();
      clearTimeout(delay);
    };
  }, [query, params]);

  return { setQuery, query, suggestion };
}
