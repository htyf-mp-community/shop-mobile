import React from "react";

import { FlatList } from "react-native";
import Category from "../../components/Category/index";
import useFetch from "../../hooks/useFetch";

export default function Categories() {
  const { data } = useFetch<any[]>("/products/categories");

  return (
    <FlatList
      horizontal
      style={{ height: 60 }}
      data={data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => <Category category={item} />}
    />
  );
}
