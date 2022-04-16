import React from "react";
import { FlatList } from "react-native";
import Category from "../../components/Category/index";
import useFetch from "@utils/hooks/useFetch";

export default function Categories() {
  const { data } = useFetch<readonly string[]>("/products/categories");

  function renderItem({ item }: { item: string }) {
    return <Category category={item} />;
  }

  return (
    <FlatList
      testID="categories-list"
      horizontal
      style={{ height: 60 }}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(category) => category}
      renderItem={renderItem}
    />
  );
}
