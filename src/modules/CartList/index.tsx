import React from "react";
import { VirtualizedList, View } from "react-native";
import Product, { ProductTypeProps } from "../Product/Product";
import { Text } from "react-native";
import useCartDelete from "./useCartDelete";
import text from "./styles";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

interface CartProps extends ProductTypeProps {
  cart_id: number;
}

interface CartListProps {
  setRefetch: (value: any) => void;
  data: CartProps[];
}

const getItem = (data: CartProps[], key: number) => {
  return data[key];
};

export default function CartList({ setRefetch, data }: CartListProps) {
  const removeCartProduct = useCartDelete();

  const RefreshCart = () => {
    setRefetch((refetch: number) => refetch + 1);
  };

  // Higher Performance
  return (
    <VirtualizedList
      showsVerticalScrollIndicator={false}
      getItem={getItem}
      getItemCount={(data) => data.length}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      data={data}
      renderItem={({ item }) => (
        <View
          style={{ position: "relative" }}
          /*  layout={Layout.delay(200)}
          entering={FadeIn}
          exiting={FadeOut} */
        >
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

  // Nice looking layout animation

  /* return (
    <Animated.ScrollView layout={Layout}>
      {data.map((item) => (
        <Animated.View
          key={item.cart_id}
          style={{ position: "relative" }}
          layout={Layout.delay(200)}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Product
            route="Cart"
            deleteFn={() => removeCartProduct(item.cart_id)}
            sharedID="CartItems"
            RefetchCart={RefreshCart}
            fullSize
            {...item}
          />
          <Text style={text}>{item.ammount}</Text>
        </Animated.View>
      ))}
    </Animated.ScrollView>
  ); */
}
