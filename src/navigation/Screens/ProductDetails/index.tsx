import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Colors } from "../../../constants/styles";
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

  const { data: result } = useFetch<Product>(
    `/products/product/${prod_id}`,
    [isFocused, refreshing],
    {}
  );

  const imgList = result?.img_id as ProductImageProps[];
  const images = imgList?.length > 1 ? imgList.splice(1, imgList.length) : [];

  const [showModal, setShowModal] = useState(false);

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
        sharedID={sharedID}
        prod_id={prod_id}
        image={image}
        images={images}
      />

      <ProductDetailsText result={result as ProductTypeProps} />
      <ProductDetailsButtons
        thumbnail={image}
        prod_id={prod_id}
        sharedID={sharedID}
        reviews={result.rating_id}
        name={result.title}
      />

      <PopUpCarusel />
    </ScrollView>
  );
}
