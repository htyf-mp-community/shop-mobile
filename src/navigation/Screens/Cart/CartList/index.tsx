import React from "react";
import {
  VirtualizedList,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import Product from "../../../../modules/Product";
import { Text } from "react-native";
import text from "./styles";
import { CartProps } from "/@types/types";
import Loader from "../components/Loader";
import { useCart } from "../useCart";

interface CartListProps {
  data: CartProps[];
  onEndReached: () => void;
  isLoading: boolean;
}

const getItem = (data: CartProps[], key: number) => {
  return data[key];
};

export default function CartList({
  data,
  onEndReached,
  isLoading,
}: CartListProps) {
  const { width } = useWindowDimensions();

  const { remove: onRemoveCartProduct } = useCart();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <VirtualizedList
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
      initialNumToRender={3}
      getItemCount={(data) => data.length}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      data={data}
      renderItem={({ item }) => (
        <View
          style={{ position: "relative" }}
          testID="CART.ELEMENT"
          accessibilityLabel="Item"
        >
          <Product
            onRemoveCartProduct={() => onRemoveCartProduct(item.cart_id)}
            route="Cart"
            sharedID="CartItems"
            fullSize
            {...item}
          />
          <Text style={text} testID={`CART.ELEMENT.${item.prod_id}`}>
            {item.ammount}
          </Text>
        </View>
      )}
    />
  );
}
