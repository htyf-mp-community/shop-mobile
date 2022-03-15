import InfiniteScroll from "modules/InfiniteScroll";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScreenNavigationProps } from "../../../@types/types";
import { Colors, h3 } from "../../../constants/styles";
import Product from "../../../modules/Product";

export default function SearchResults({
  route,
}: ScreenNavigationProps<"SearchResults">) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <InfiniteScroll
        getItemCount={(c) => c.length}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        path={`/products/category?q=${category}`}
        orientation="vertical"
        getItem={(item, key) => item[key]}
        renderItem={({ item }: { item: any }) => (
          <Product
            key={item.prod_id}
            sharedID="SearchResult"
            fullSize={true}
            {...item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
