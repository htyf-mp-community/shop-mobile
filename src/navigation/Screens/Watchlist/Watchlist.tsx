import { View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import ProductsList from "./components/ProductsList";
import useWatchlist from "./useWatchlist";
import { ScreenNavigationProps } from "/@types/types";

export default function Watchlist({
  navigation,
}: ScreenNavigationProps<"Watchlist">) {
  const { theme } = useColorTheme();
  const { data, onEndReached } = useWatchlist();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <ProductsList
        selectedProduct={data[0]}
        onEndReached={onEndReached}
        data={data}
      />
    </View>
  );
}
