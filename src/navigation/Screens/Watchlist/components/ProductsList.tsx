import { VirtualizedList, View } from "react-native";
import ProductTile from "./ProductTile";

import type { ProductMinified } from "/@types/types";

interface ProductsListProps {
  data: ProductMinified[][];
  onEndReached: () => void;
}

export default function ProductsList({
  data,
  onEndReached,
}: ProductsListProps) {
  return (
    <VirtualizedList
      data={data}
      initialNumToRender={6}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      keyExtractor={(list: [ProductMinified, ProductMinified]) => {
        return list[0].prod_id.toString();
      }}
      getItem={(data, key) => data[key] as [ProductMinified, ProductMinified]}
      getItemCount={(d) => d.length}
      renderItem={({ item, index }) => {
        const hasMoreThanOne = item.length === 2;
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: hasMoreThanOne ? "space-between" : "flex-start",
              marginTop: 10,
              paddingHorizontal: 5,
            }}
          >
            {item.map((product, _index) => (
              <ProductTile
                listIndex={((index || 1) * (_index + 1)) / 2}
                product={product}
                key={product.prod_id}
              />
            ))}
          </View>
        );
      }}
    />
  );
}
