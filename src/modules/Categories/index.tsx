import React from "react";

import { FlatList, useWindowDimensions } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import Category from "../../components/Category/index";
import useFetch from "../../hooks/useFetch";

/**
 * Fetches all kinds of categories from the server and displays them
 **/
export default function Categories() {
  const { data, loading } = useFetch<readonly string[]>("/products/categories");

  const { width } = useWindowDimensions();

  if (loading) {
    return (
      <SkeletonContent
        isLoading={loading}
        animationDirection="horizontalRight"
        animationType="shiver"
        boneColor="#1e293b"
        highlightColor="#2a3a54"
        layout={[
          { key: "someId", width: width - 20, height: 50, marginBottom: 6 },
        ]}
      />
    );
  }

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
