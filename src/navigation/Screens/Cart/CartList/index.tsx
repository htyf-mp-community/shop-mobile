import React from "react";
import {
  VirtualizedList,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { CartProps } from "/@types/types";
import Loader from "../components/Loader";
import CartProduct from "../components/CartProduct";

interface CartListProps {
  data: CartProps[];
  onEndReached: () => void;
  isLoading: boolean;
  isFetchingMore: boolean;
}

const getItem = (data: CartProps[], key: number) => {
  return data[key];
};

export default function CartList({
  data,
  onEndReached,
  isLoading,
  isFetchingMore,
}: CartListProps) {
  const { width } = useWindowDimensions();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <VirtualizedList
      ListFooterComponent={
        isFetchingMore ? (
          <ActivityIndicator color="#fff" size={"large"} />
        ) : null
      }
      testID="cart-list"
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={
        <Image
          source={require("@assets/Shopping_Cart.png")}
          style={{ width, height: 400 }}
        />
      }
      showsVerticalScrollIndicator={false}
      getItem={getItem}
      initialNumToRender={5}
      getItemCount={(data) => data.length}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      data={data}
      renderItem={({ item }) => <CartProduct product={item} />}
    />
  );
}
