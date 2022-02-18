import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { ProductTypeProps } from "modules/Product";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "@modules/Purchase/Purchase";
import useFetch from "@utils/hooks/useFetch";
import CartList from "@modules/CartList";
import { useAppDispatch, useAppSelector } from "@utils/hooks/hooks";
import { cartActions } from "@redux/Cart";
import useColorTheme from "@utils/context/ThemeContext";
import { SkeletonPlaceholder } from "@components/index";
import { notEmpty } from "@functions/typecheckers";

const { width, height } = Dimensions.get("screen");

export default function Cart() {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const { loading, data } = useFetch<ProductTypeProps[]>(
    "/cart",
    [isFocused],
    [],
    (state) => {
      dispatch(cartActions.setCart(state));
    }
  );

  function updateCartState(id: number) {
    dispatch(cartActions.incrementAmmount(id));
  }

  const { theme } = useColorTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {loading && notEmpty(data) && (
        <SkeletonPlaceholder
          backgroundColor={"#1f2b3d"}
          highlightColor={"#2a3a52"}
          size={{ width, height }}
        >
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={new Array(3).fill({})}
            keyExtractor={(_, i) => i.toString()}
            renderItem={() => (
              <SkeletonPlaceholder.Item height={240} width={width - 20} />
            )}
          />
        </SkeletonPlaceholder>
      )}

      <CartList updateCartState={updateCartState} data={cart} />

      <Purchase cart={cart} />
    </View>
  );
}
