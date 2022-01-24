import React from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import ImagesCarusel from "../../../modules/ImagesCarusel/ImagesCarusel";
import ProductDetailsText from "../../../modules/ProductDetailsText/ProductDetailsText";
import ProductDetailsButtons from "../../../modules/ProductDetailsButtons/ProductDetailsButtons";
import { useIsFocused } from "@react-navigation/native";
import useFetch from "../../../hooks/useFetch";
import {
  Product,
  ProductImageProps,
  ScreenNavigationProps,
} from "../../../@types/types";
import { wait } from "../../../functions/wait";
import { ProductTypeProps } from "../../../modules/Product/Product";
import PopUpCarusel from "../../../modules/PopUpCarusel";
import ProductLoader from "./loader";
import AddToCart from "../../../modules/AddToCart/AddToCart";
import styles from "./styles";
import Animated, {
  SlideInDown,
  SlideInUp,
  Layout,
} from "react-native-reanimated";
import { Colors } from "../../../constants/styles";

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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <ScrollView
        style={styles.container}
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
          <ProductLoader loading={loading} />
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
        style={styles.buttonContainer}
        entering={SlideInDown}
        exiting={SlideInUp}
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
                result.quantity === 0 ? Colors.primary : "#1e3a8a",
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}
