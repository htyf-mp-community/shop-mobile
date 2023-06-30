import { VirtualizedList, View, Image, Text } from "react-native";
import ProductTile, { TILE_WIDTH } from "./ProductTile";
import { useState } from "react";
import type {
  Product,
  ProductImageProps,
  ProductMinified,
} from "/@types/types";
import { useAppSelector } from "utils/hooks/hooks";
import { wait } from "functions/wait";
import { MasonryFlashList } from "@shopify/flash-list";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Colors } from "constants/styles";
import Button from "components/ui/Button/Button";
import { image } from "functions/image";
import Color from "color";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import layout from "constants/layout";
import { FlatList } from "react-native-gesture-handler";

interface ProductsListProps {
  data: ProductMinified[];
  onEndReached: () => void;

  selectedProduct: ProductMinified;
}

export default function ProductsList({
  data,
  onEndReached,

  selectedProduct,
}: ProductsListProps) {
  return (
    <>
      <View style={{ flex: 1 }}>
        <MasonryFlashList
          numColumns={2}
          data={data}
          keyExtractor={(key) => key.prod_id.toString()}
          onEndReached={onEndReached}
          estimatedItemSize={TILE_WIDTH}
          renderItem={({ item, index }) => (
            <ProductTile
              isExpanded={false}
              listIndex={index}
              product={item}
              onLongProductPress={() => {}}
            />
          )}
        />
      </View>

      <BottomSheet
        index={0}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: Colors.primary }}
        style={{ paddingHorizontal: 10, justifyContent: "space-between" }}
        snapPoints={["80%"]}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <Text style={{ fontSize: 10, color: "gray", textAlign: "right" }}>
          Product id: {selectedProduct?.prod_id}
        </Text>
        <Text
          textBreakStrategy="highQuality"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          {selectedProduct?.title}
        </Text>

        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            style={{
              marginTop: 10,
              height: 130,
              flexGrow: 0,
            }}
            horizontal
            data={selectedProduct?.img_id || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Image
                resizeMode="center"
                source={image(item.name)}
                style={{
                  width: layout.screen.width / 2,
                  marginRight: 10,
                  borderRadius: 5,
                  height: 130,
                }}
              />
            )}
          />

          <View style={{ flex: 1, paddingVertical: 10 }}>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              Current price ${selectedProduct?.price}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              Lowest price $
              {(selectedProduct?.price - Math.random() * 1000).toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <Button
            type="contained"
            color="primary"
            icon={
              <FontAwesome5 name="trash-alt" size={24} color={Colors.error} />
            }
            fontStyle={{ color: Colors.error }}
            style={{
              backgroundColor: Color(Colors.error).alpha(0.25).string(),
              width: 60,
              borderRadius: 100,
            }}
          />
          <Button
            type="contained"
            color="primary"
            text="Add to cart"
            style={{
              flex: 4,
              backgroundColor: Colors.secondary,
              borderRadius: 100,
              padding: 15,
            }}
          />
        </View>
      </BottomSheet>
    </>
  );
}
