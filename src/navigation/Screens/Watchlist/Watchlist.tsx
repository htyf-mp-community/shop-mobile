import { View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import ProductsList from "./components/ProductsList";
import useWatchlist from "./useWatchlist";
import { ProductMinified, ScreenNavigationProps } from "/@types/types";
import { useRef, useState } from "react";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";

export default function Watchlist({
  navigation,
}: ScreenNavigationProps<"Watchlist">) {
  const { theme } = useColorTheme();
  const { data, onEndReached } = useWatchlist();

  const [selectedProduct, setSelectedProduct] =
    useState<ProductMinified | null>(null);

  const sheetRef = useRef<BottomSheet | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <ProductsList
        sheetRef={sheetRef}
        selectedProduct={selectedProduct}
        onEndReached={onEndReached}
        data={data}
        setSelected={(prod) => {
          setSelectedProduct(prod);
          sheetRef.current?.expand();
        }}
      />
    </View>
  );
}
