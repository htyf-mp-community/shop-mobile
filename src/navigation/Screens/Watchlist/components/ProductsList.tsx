import { VirtualizedList, View, Image, Text } from "react-native";
import ProductTile from "./ProductTile";
import { useState } from "react";
import type { ProductMinified } from "/@types/types";
import { Modal } from "components";
import { image } from "functions/image";
import PreviewModal from "./PreviewModal";

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

  function closeModal() {
    setModalVisible(false);
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
                  onLongProductPress={selectProductAndShowModal}
                  listIndex={((index || 1) * (_index + 1)) / 2}
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
