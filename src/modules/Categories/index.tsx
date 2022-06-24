import React from "react";
import { FlatList, View } from "react-native";
import Category from "../../components/Category/index";
import useFetch from "@utils/hooks/useFetch";
import { SkeletonPlaceholder } from "components";

export default function Categories() {
  const { data, loading } = useFetch<readonly string[]>("/products/categories");

  function renderItem({ item }: { item: string }) {
    return <Category category={item} />;
  }

  if (loading) {
    return (
      <SkeletonPlaceholder
        backgroundColor={"#1f2b3d"}
        highlightColor={"#2a3a52"}
        size={({ width }) => ({ width, height: 60 })}
      >
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {new Array(3).fill(0).map((_, index) => (
            <SkeletonPlaceholder.Item key={index} width={120} height={40} />
          ))}
        </View>
      </SkeletonPlaceholder>
    );
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
