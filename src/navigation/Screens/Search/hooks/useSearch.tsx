import { useState, useEffect } from "react";
import { useUser } from "@utils/context/UserContext";
import axios, { CancelTokenSource } from "axios";

import { API } from "constants/routes";
import useRecent from "navigation/Screens/Search/hooks/useRecent";

import type { Paging, SuggestionType } from "/@types/types";

type Suggestion = Paging<SuggestionType>;

export default function useSearch(params: {
  title?: string;
  price?: string;
  category?: string;
}) {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState<Suggestion>({
    hasMore: false,
    results: [],
  });

  const [skip, setSkip] = useState(0);

  const {
    user: { token },
  } = useUser();

  const { recent, appendRecent } = useRecent();

  function onEndReached() {
    if (suggestion.hasMore) setSkip(skip + 5);
  }

  /**
   * fetches product's suggestions from api
   * @param {Boolean} withPagination if prop is true then new records are added to list with previous results, otherwise not
   **/
  async function getSuggestionsAsync(
    cancelToken: CancelTokenSource,
    withPagination: boolean
  ) {
    if (query.trim() !== "") {
      try {
        appendRecent(query);
        const { data } = await axios.get(`${API}/products/search`, {
          method: "GET",
          headers: {
            token,
          },
          cancelToken: cancelToken.token,
          params: {
            q: query,
            ...params,
            skip,
          },
        });

        setSuggestion((prev) => ({
          hasMore: data.hasMore,
          results: withPagination
            ? [...prev.results, ...data.results]
            : data.results,
        }));
      } catch (error: any) {
        console.warn(error.response.data);
      }
    }
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const delay = setTimeout(
      () => getSuggestionsAsync(cancelToken, false),
      500
    );

    return () => {
      cancelToken.cancel();
      clearTimeout(delay);
    };
  }, [query, params]);

  useEffect(() => {
    if (suggestion.hasMore) {
      const cancelToken = axios.CancelToken.source();

      const delay = setTimeout(
        () => getSuggestionsAsync(cancelToken, true),
        500
      );

      return () => {
        cancelToken.cancel();
        clearTimeout(delay);
      };
    }
  }, [skip]);

  return { setQuery, query, suggestion, recent, onEndReached };
}
