import InfiniteScroll from "modules/InfiniteScroll";
import React from "react";
import { ScreenNavigationProps } from "../../../@types/types";
import Product from "../../../modules/Product";

export default function SearchResults({
  route,
}: ScreenNavigationProps<"SearchResults">) {
  const { category } = route.params;

  return (
    <InfiniteScroll
      initialNumToRender={4}
      getItemCount={(c) => c.length}
      keyExtractor={({ prod_id }) => prod_id.toString()}
      path={`/products/category?q=${category}`}
      orientation="vertical"
      getItem={(item, key) => item[key]}
      renderItem={({ item }: { item: any }) => (
        <Product sharedID="SearchResult" fullSize {...item} />
      )}
    />
  );
}
