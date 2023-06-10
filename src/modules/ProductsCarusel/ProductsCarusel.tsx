import React, { memo } from "react";
import { View, Text, VirtualizedList } from "react-native";
import Product from "../Product";
import { ProductTypeProps } from "../Product";
import caruselStyles from "./caruselStyles";
import { notEmpty } from "../../functions/typecheckers";
import EmptyList from "./Info";
import useFetchProducts from "./useFetchProducts";
import ProductSkeleton from "modules/ProductSkeleton";
import useColorTheme from "utils/context/ThemeContext";
import { PRODUCT_CONTAINER_SIZE_X } from "modules/Product/assets";
import layout from "constants/layout";

interface MostRecentProps {
  path: string;
  title: string;
  sharedID: string;
  refresh: boolean;
  center?: boolean;
}

const getItem = (data: ProductTypeProps[], key: number) => {
  return data[key];
};

function ProductsCarusel({
  path,
  title,
  sharedID,
  center = false,
}: MostRecentProps) {
  const { theme } = useColorTheme();
  const { data, loading, onEndReached, error } = useFetchProducts(path);
  const isError = !!error && !loading && data.length === 0;
  const isLoading = !notEmpty(data) && loading;
  const productMargin = 5;
  const gaps =
    (layout.screen.width - (PRODUCT_CONTAINER_SIZE_X + productMargin * 2)) / 2;

  const snapToOffsets = data.map(
    (_, index) => index * (PRODUCT_CONTAINER_SIZE_X + 10) - gaps
  );

  const renderItem = ({ item, index }: any) => (
    <Product
      {...item}
      sharedID={sharedID}
      fullSize={center}
      style={{
        marginRight: data.length - 1 === index ? 10 : undefined,
      }}
    />
  );

  return (
    <View style={caruselStyles.container}>
      <Text style={[caruselStyles.title, { color: theme.text }]}>{title}</Text>

      {isLoading && <ProductSkeleton />}

      {isError && <EmptyList variant="error" error={""} />}

      <VirtualizedList
        removeClippedSubviews
        decelerationRate={0.95}
        onEndReachedThreshold={0.75}
        snapToInterval={layout.screen.width - 20}
        snapToOffsets={snapToOffsets}
        data={data}
        onEndReached={onEndReached}
        horizontal
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        getItem={getItem}
        getItemCount={(data) => data.length}
        keyExtractor={(item: ProductTypeProps) => item.prod_id.toString()}
        renderItem={renderItem}
      />

      {/* // <FlashList  // Doesnt work properly, bugged components on 1 render
        //   estimatedItemSize={PRODUCT_WIDTH}
        //   data={data}
        //   removeClippedSubviews
        //   decelerationRate={0.95}
        //   onEndReachedThreshold={0.5}
        //   snapToInterval={layout.screen.width - 20}
        //   snapToOffsets={snapToOffsets}
        //   onEndReached={onSkip}
        //   horizontal
        //   showsHorizontalScrollIndicator={false}
        //   showsVerticalScrollIndicator={false}
        //   keyExtractor={(item: ProductTypeProps) => item.prod_id.toString()}
        //   renderItem={renderItem}
        // /> */}
    </View>
  );
}

export default memo(ProductsCarusel);
