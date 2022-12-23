import { VirtualizedList, View, Image, Text } from "react-native";
import ProductTile from "./ProductTile";
import { useState } from "react";
import type { ProductMinified } from "/@types/types";
import PreviewModal from "./PreviewModal";
import { useAppSelector } from "utils/hooks/hooks";
import { wait } from "functions/wait";

interface ProductsListProps {
  data: ProductMinified[][];
  onEndReached: () => void;
}

export default function ProductsList({
  data,
  onEndReached,
}: ProductsListProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<ProductMinified | null>(null);

  function selectProductAndShowModal(product: ProductMinified) {
    setSelectedProduct(product);
    setModalVisible(true);
  }

  async function closeModal() {
    setModalVisible(false);
    await wait(100); // wait for animation to finish
    setSelectedProduct(null);
  }

  return (
    <>
      <PreviewModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
        selectedProduct={selectedProduct}
      />

      <VirtualizedList
        data={data}
        initialNumToRender={6}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        keyExtractor={(list: ProductMinified[], index) => {
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
                paddingHorizontal: 5,
              }}
            >
              {item.map((product, _index) => (
                <ProductTile
                  isExpanded={item.length === 1}
                  onLongProductPress={selectProductAndShowModal}
                  //   listIndex={((index || 1) * (_index + 1)) / 2}
                  listIndex={index}
                  product={product}
                  key={product.prod_id}
                />
              ))}
            </View>
          );
        }}
      />
    </>
  );
}
