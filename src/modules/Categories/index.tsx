import React from "react";

import { FlatList } from "react-native";
import Category from "../../components/Category/index";
import useFetch from "../../hooks/useFetch";

/**
 * Fetches all kinds of categories from the server and displays them
 **/
export default function Categories() {
  const { data } = useFetch<readonly string[]>("/products/categories");
  return (
    <FlatList
      horizontal
      style={{ height: 60 }}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => <Category category={item} />}
    />
  );
}
