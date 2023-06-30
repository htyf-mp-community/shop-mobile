import { Paging, ProductMinified } from "/@types/types";
import { useCallback, useState } from "react";
import { watchlistActions } from "redux/Watchlist/Watchlist";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import useFetch from "utils/hooks/useFetch";

export default function useWatchlist() {
  const dispatch = useAppDispatch();

  const { isSynced, hasMore, data } = useAppSelector((s) => s.watchlist);

  const [skip, setSkip] = useState(5);
  const onSuccessfulFetch = useCallback((d: Paging<ProductMinified>) => {
    dispatch(watchlistActions.setWatchlist(d));
  }, []);

  const { loading, refetch } = useFetch("/watchlist", {
    invalidate: [],
    fetchOnMount: !isSynced,
    onSuccess: onSuccessfulFetch,
  });

  const isLoading = loading && data.length === 0;

  const onEndReached = useCallback(async () => {
    if (!hasMore) return;

    await refetch(undefined, { skip });

    setSkip((s) => s + 5);
  }, [skip, hasMore]);

  return {
    data,
    isLoading,
    onEndReached,
  };
}
