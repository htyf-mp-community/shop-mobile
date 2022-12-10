import React, { useState } from "react";
import {
  VirtualizedList,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
} from "react-native";
import { CartProps } from "/@types/types";
import Loader from "../components/Loader";
import CartProduct from "../components/CartProduct";
import { Button, ThemedText } from "components";
import { Colors } from "constants/styles";
import Color from "color";
import layout from "constants/layout";

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

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  function handleToggleSelect(value: boolean, product: CartProps) {
    value
      ? setSelectedProducts([...selectedProducts, product.prod_id])
      : setSelectedProducts(
          selectedProducts.filter((id) => id !== product.prod_id)
        );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <VirtualizedList
      ListHeaderComponent={
        selectedProducts.length > 0 && showCheckboxes ? (
          <Button
            text="Remove selected"
            style={{
              justifyContent: "space-between",
              marginHorizontal: 10,
              paddingVertical: 15,
              backgroundColor: Color("red").darken(0.7).alpha(0.2).string(),
            }}
            fontStyle={{ color: "red" }}
            icon={
              <Text style={{ color: "red", fontSize: 20 }}>
                {selectedProducts.length}
              </Text>
            }
          />
        ) : null
      }
      ListFooterComponent={
        isFetchingMore ? (
          <ActivityIndicator color="#fff" size={"large"} />
        ) : null
      }
      testID="cart-list"
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={
        <View
          style={{
            height: layout.screen.height - 225,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("@assets/Shopping_Cart.png")}
            style={{ width: layout.screen.width - 40, height: 350 }}
          />
        </View>
      }
      showsVerticalScrollIndicator={false}
      getItem={getItem}
      initialNumToRender={5}
      getItemCount={(data) => data.length}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      data={data}
      renderItem={({ item, index }) => (
        <CartProduct
          productIndex={index}
          handleShowCheckbox={() => setShowCheckboxes((prev) => !prev)}
          showCheckbox={showCheckboxes}
          isProductSelected={selectedProducts.includes(item.prod_id)}
          handleSelectProduct={(value) => handleToggleSelect(value, item)}
          product={item}
        />
      )}
    />
  );

  // return (
  //   <ScrollView style={{ height: layout.screen.height }}>
  //     {data.map((item, index) => (
  //       <CartProduct
  //         key={item.prod_id}
  //         productIndex={index}
  //         handleShowCheckbox={() => setShowCheckboxes((prev) => !prev)}
  //         showCheckbox={showCheckboxes}
  //         isProductSelected={selectedProducts.includes(item.prod_id)}
  //         handleSelectProduct={(value) => handleToggleSelect(value, item)}
  //         product={item}
  //       />
  //     ))}
  //   </ScrollView>
  // );
}
