import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../context/UserContext";
import { SuggestionType } from "../../../@types/types";
import { API } from "../../../constants/routes";

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

          console.log(data);

          setSuggestion(data);
        } catch (error) {}
      }
    }, 500);

    return () => {
      cancelToken.cancel();
      clearTimeout(delay);
    };
  }, [query]);

  return { suggestion, setQuery, query };
}
