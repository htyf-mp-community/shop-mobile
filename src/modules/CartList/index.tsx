import React from "react";
import axios from "axios";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { FlatList, StyleProp, TextStyle } from "react-native";
import Product, { ProductTypeProps } from "../Product/Product";
import { View, Text } from "react-native";
import { Colors, radius } from "../../constants/styles";

const text: StyleProp<TextStyle> = {
  width: 45,
  height: 45,
  color: Colors.text,
  fontFamily: "PoppinsMedium",
  position: "absolute",
  zIndex: 3,
  right: 15,
  fontSize: 25,
  padding: 5,
  top: 5,
  borderRadius: radius.medium,
  backgroundColor: Colors.secondary,
  textAlign: "center",
};

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
  const { user } = useUser();

  async function RemoveCartProduct(cart_id: number) {
    try {
      const { data } = await axios.delete(`${API}/cart`, {
        headers: {
          token: user.token,
        },
        params: {
          id: cart_id,
        },
      });

      if (data.status === "Deleted") {
        setDeleted((deleted: number) => deleted + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            deleteFn={() => RemoveCartProduct(item.cart_id)}
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
