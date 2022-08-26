import { useState, useEffect } from "react";
import { useUser } from "@utils/context/UserContext";
import axios, { CancelTokenSource } from "axios";

import { API } from "constants/routes";
import useRecent from "navigation/Screens/Search/hooks/useRecent";

import type { Paging, SuggestionType } from "/@types/types";
import RemoveProductsRepetition from "functions/RemoveRepetition";

type Suggestion = Paging<SuggestionType>;

export default function useSearch() {
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
    text: string,
    withPagination: boolean
  ) {
    if (text.trim() !== "") {
      try {
        appendRecent(text);
        const { data } = await axios.get(`${API}/products/search`, {
          method: "GET",
          params: {
            q: text,
          },
          headers: {
            token,
          },
          cancelToken: cancelToken.token,
        });

        setSuggestion((prev) => ({
          hasMore: data.hasMore,
          results: withPagination
            ? RemoveProductsRepetition(
                [...prev.results, ...data.results],
                "prod_id"
              )
            : data.results,
        }));
      } catch (error: any) {
        console.warn(error.response.data);
      }
    }
  }

  return {
    getSuggestionsAsync,

    suggestion,
    recent,
    onEndReached,
  };
}
