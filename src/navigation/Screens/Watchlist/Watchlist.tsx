import { ProductMinified } from "/@types/types";
import { View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import useFetch from "utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/hooks/hooks";
import { watchlistActions } from "redux/Watchlist/Watchlist";
import { useMemo } from "react";
import ProductsList from "./components/ProductsList";
import { transformInto2DimsArray } from "./transform2Dims";

const init = {
  hasMore: false,
  results: [],
};

interface FetchProps {
  hasMore: boolean;
  results: ProductMinified[];
}

export default function Watchlist() {
  const { theme } = useColorTheme();
  const dispatch = useDispatch();
  const { data, isSynced, hasMore } = useAppSelector(
    (state) => state.watchlist
  );

  const { onEndReached } = useFetch<FetchProps>("/watchlist", {
    invalidate: [],
    // infiniteScroll: true,
    fetchOnMount: !isSynced,
    onSuccess: (data = init) => {
      dispatch(watchlistActions.setWatchlist(data));
    },
  });

  const watchlist = useMemo(() => transformInto2DimsArray(data), [data]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <ProductsList data={watchlist} />
    </View>
  );
}
