import React, { useRef } from "react";
import { ScrollView, Animated, RefreshControl } from "react-native";
import { Colors } from "../../constants/styles";
import AddToCart from "../../modules/AddToCart/AddToCart";
import ImagesCarusel from "../../modules/ImagesCarusel/ImagesCarusel";
import ProductDetailsText from "../../modules/ProductDetailsText/ProductDetailsText";
import ProductDetailsButtons from "../../modules/ProductDetailsButtons/ProductDetailsButtons";
import { useIsFocused } from "@react-navigation/native";
import useFetch from "../../hooks/useFetch";
import { ProductImageProps, ScreenNavigationProps } from "../../@types/types";
import { wait } from "../../functions/wait";

export default function ProductDetails({
  route,
  navigation,
}: Required<ScreenNavigationProps<"Details">>) {
  const { prod_id, image, sharedID } = route.params;
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const { data: result } = useFetch<any>(`/products/product/${prod_id}`, [
    isFocused,
    refreshing,
  ]);

  const imgList = result?.img_id as ProductImageProps[];
  const images = imgList?.length > 1 ? imgList.splice(1, imgList.length) : [];
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      bounces
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ImagesCarusel
        scrollX={scrollX}
        sharedID={sharedID}
        prod_id={prod_id}
        image={image}
        images={images}
      />

      <AddToCart
        prod_id={prod_id}
        style={{
          zIndex: 10,
          top: 260,
        }}
      />

      <ProductDetailsText result={result} images={images} scrollX={scrollX} />
      <ProductDetailsButtons
        navigation={navigation}
        propsAdd={{
          thumbnail: image,
          prod_id,
          sharedID,
          prod_name: result.title,
        }}
        propsRead={{
          reviews: result.rating_id,
          thumbnail: image,
          prod_id,
          sharedID,
          prod_name: result.title,
        }}
      />
    </ScrollView>
  );
}
