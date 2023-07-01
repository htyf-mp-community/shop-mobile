import React, { useState, forwardRef } from "react";
import { VirtualizedList, Image, View } from "react-native";
import { CartProps } from "/@types/types";
import Loader from "../components/Loader";
import CartProduct from "../components/CartProduct";
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

const ListEmptyComponent = () => (
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
);

const CartList = forwardRef<VirtualizedList<any>, CartListProps>(
  ({ data, onEndReached, isLoading }, ref) => {
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
        ref={ref}
        removeClippedSubviews
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={ListEmptyComponent}
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
  }
);

export default CartList;
