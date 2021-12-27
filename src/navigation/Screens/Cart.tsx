import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { Colors, h1, h2, radius } from "../../constants/styles";
import Products, { ProductTypeProps } from "../../modules/Product/Product";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../modules/Purchase/Purchase";
import { wait } from "./Home";
import { AntDesign } from "@expo/vector-icons";
import useFetch from "../../hooks/useFetch";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function Cart() {
  const { user } = useUser();
  const isFocused = useIsFocused();
  const [deleted, setDeleted] = useState(0);

  async function RemoveCartProduct(cart_id: number) {
    try {
      const { data } = await axios.delete(`${API}/cart?id=${cart_id}`, {
        headers: {
          token: user.token,
        },
      });

      if (data.status === "Deleted") {
        setDeleted(deleted + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [refresh, setRefresh] = useState(false);
  const [refetch, setRefetch] = useState(0);

  const RefreshCart = () => {
    setRefetch(refetch + 1);
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

  const { data } = useFetch<ProductTypeProps[]>("/cart", [
    deleted,
    isFocused,
    refresh,
    refetch,
  ]);

  return (
    <View style={styles.container}>
      {data.length === 0 && (
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[h1, { textAlign: "center" }]}>Empty</Text>
          <AntDesign name="shoppingcart" size={300} color="#fff" />
        </View>
      )}
      <ScrollView
        bounces
        style={{
          marginTop: 15,
          height: SCREEN_HEIGHT * 0.9,
          position: "relative",
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {typeof data !== "undefined" &&
          data.map((prod: any, i: number) => {
            return (
              <View key={i} style={{ position: "relative" }}>
                <Products
                  {...prod}
                  route="Cart"
                  deleteFn={() => RemoveCartProduct(prod.cart_id)}
                  sharedID="CartItems"
                  RefetchCart={RefreshCart}
                  fullSize={true}
                />
                <Text style={styles.text}>{prod.ammount}</Text>
              </View>
            );
          })}
      </ScrollView>

      <Purchase cart={data as any} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.91,
    backgroundColor: Colors.primary,
  },
  text: {
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
  },
});
