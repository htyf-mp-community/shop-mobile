import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import { ProductTypeProps } from "../../../modules/Product/Product";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../../modules/Purchase/Purchase";
import useFetch from "../../../hooks/useFetch";
import CartList from "../../../modules/CartList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default function Cart() {
  const isFocused = useIsFocused();
  const [deleted, setDeleted] = useState(0);
  const [refetch, setRefetch] = useState(0);
  const { data, loading } = useFetch<ProductTypeProps[]>(
    "/cart",
    [deleted, isFocused, refetch],
    []
  );
  return (
    <View style={styles.container}>
      <CartList setDeleted={setDeleted} setRefetch={setRefetch} data={data} />
      <Purchase cart={data} />
    </View>
  );
}
