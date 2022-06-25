import { memo, useState, useCallback } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import ImagesCarusel from "./components/ImagesCarusel/ImagesCarusel";
import { ScreenNavigationProps } from "/@types/types";
import styles from "./styles";
import useColorTheme from "@utils/context/ThemeContext";
import ProductSuggestion from "./components/Suggestions/ProductSuggestion";
import BottomTab from "./components/BottomTab/BottomTab";
import DetailsLoader from "./components/Loader";
import { wait } from "functions/wait";
import Details from "./components/Details/Details";
import useProduct from "./hooks/useProduct";

function ProductDetails({ route }: Required<ScreenNavigationProps<"Details">>) {
  const { prod_id, image, sharedID } = route.params;
  const { data, loading = true, refetch } = useProduct(prod_id);
  const result = data?.product;

  const images = [
    { id: 0, name: image?.split("=")[1] },
    ...(result?.img_id || []),
  ];

  const { theme } = useColorTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch({ prod_id });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.primary }]}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImagesCarusel {...{ sharedID, prod_id, images }} />

        <DetailsLoader loading={loading} />

        {!loading && result && (
          <>
            <Details image={image} sharedID={sharedID} {...result} />

            <ProductSuggestion text={result.title} />
          </>
        )}
      </ScrollView>
      <BottomTab prod_id={prod_id} quantity={result?.quantity || 0} />
    </View>
  );
}

export default memo(ProductDetails);
