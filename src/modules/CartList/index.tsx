import React from "react";
import { FlatList } from "react-native";
import Product, { ProductTypeProps } from "../Product/Product";
import { View, Text } from "react-native";
import useCartDelete from "./useCartDelete";
import text from "./styles";

interface CartListProps {
  setDeleted: (value: any) => void;
  setRefetch: (value: any) => void;
  data: any[];
}

interface CartProps extends ProductTypeProps {
  cart_id: number;
}

export default function CartList({
  setDeleted,
  setRefetch,
  data,
}: CartListProps) {
  const removeCartProduct = useCartDelete(setDeleted);

  const RefreshCart = () => {
    setRefetch((refetch: number) => refetch + 1);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      renderItem={({ item }: { item: CartProps }) => (
        <View style={{ position: "relative" }}>
          <Product
            route="Cart"
            deleteFn={() => removeCartProduct(item.cart_id)}
            sharedID="CartItems"
            RefetchCart={RefreshCart}
            fullSize
            {...item}
          />
          <Text style={text}>{item.ammount}</Text>
        </View>
      )}
    />
  );
}
