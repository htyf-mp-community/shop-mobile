import React from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  useWindowDimensions,
} from "react-native";
import ImagesCarusel from "../../../modules/ImagesCarusel/ImagesCarusel";
import ProductDetailsText from "./components/ProductDetailsText/ProductDetailsText";
import ProductDetailsButtons from "./components/ProductDetailsButtons/ProductDetailsButtons";
import { useIsFocused } from "@react-navigation/native";
import useFetch from "../../../utils/hooks/useFetch";
import {
  Product,
  ProductImageProps,
  ScreenNavigationProps,
} from "../../../@types/types";
import { wait } from "../../../functions/wait";
import AddToCart from "../../../modules/AddToCart/AddToCart";
import styles from "./styles";
import Animated, { ZoomIn } from "react-native-reanimated";
import useColorTheme from "../../../context/ThemeContext";
import { SkeletonPlaceholder } from "../../../components";

export default function ProductDetails({
  route,
}: Required<ScreenNavigationProps<"Details">>) {
  const { prod_id, image, sharedID } = route.params;
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const { data: result, loading } = useFetch<Product>(
    `/products/product/${prod_id}`,
    [isFocused, refreshing],
    {}
  );

  const imgList = result?.img_id as ProductImageProps[];
  const images = imgList?.length > 1 ? imgList.splice(1, imgList.length) : [];

  const { theme } = useColorTheme();

  const { width } = useWindowDimensions();

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
        <ImagesCarusel
          sharedID={sharedID}
          prod_id={prod_id}
          image={image}
          images={images}
        />

        {loading && typeof result.prod_id === "undefined" && (
          <SkeletonPlaceholder
            size={{ width, height: 420 }}
            backgroundColor={"#1f2b3d"}
            highlightColor={"#2a3a52"}
          >
            <View style={{ width, alignItems: "center" }}>
              <SkeletonPlaceholder.Item height={60} width={width - 20} />
              <SkeletonPlaceholder.Item height={60} width={width - 20} />
              <SkeletonPlaceholder.Item height={260} width={width - 20} />
            </View>
          </SkeletonPlaceholder>
        )}

        {!loading && result && (
          <>
            <ProductDetailsText {...result} />
            <ProductDetailsButtons
              thumbnail={image}
              prod_id={prod_id}
              sharedID={sharedID}
              reviews={result.rating_id}
              name={result.title}
            />
          </>
        )}
      </ScrollView>
      <Animated.View
        style={[styles.buttonContainer, { backgroundColor: theme.primary }]}
        entering={ZoomIn.duration(200)}
      >
        <AddToCart
          disabled={result.quantity === 0}
          relative
          prod_id={result.prod_id}
          text="ADD TO CART"
          style={[
            styles.button,
            {
              backgroundColor:
                result.quantity === 0 ? theme.primary : "#1e3a8a",
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}
