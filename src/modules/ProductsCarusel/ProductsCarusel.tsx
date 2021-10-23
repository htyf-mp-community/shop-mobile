import React from "react";
import { View, Text, Dimensions, VirtualizedList } from "react-native";
import Product from "../Product/Product";
import { ProductTypeProps } from "../Product/Product";
import ProductLoader from "../ProductLoader/ProductLoader";
import styles from "../Product/styles";
import { Colors } from "../../constants/styles";
import useFetchProducts from "./useFetchProducts";

interface MostRecentProps {
  path: string;
  title: string;
  sharedID: string;
  refresh: boolean;
}

const { width } = Dimensions.get("screen");

export default function ProductsCarusel({
  path,
  title,
  sharedID,
  refresh,
}: MostRecentProps) {
  const getItem = (data: any[]) => data[0];

  const state = useFetchProducts(path, [refresh]);

  return (
    <View style={{ width: width }}>
      <Text
        style={{
          fontWeight: "bold",
          color: "#fff",
          fontSize: 35,
          paddingLeft: 10,
        }}
      >
        {title}
      </Text>
      {state.loading && <ProductLoader />}
      {!!state.error && (
        <View style={styles.container}>
          <View
            style={[
              styles.product,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text style={{ fontFamily: "PoppinsBold", color: Colors.text }}>
              {state.error || "Failed to fetch products"}
            </Text>
          </View>
        </View>
      )}

      {!state.loading && !state.error && (
        <VirtualizedList
          data={state.data}
          horizontal
          pagingEnabled
          initialNumToRender={1}
          getItem={getItem}
          getItemCount={(data) => data.length}
          keyExtractor={(item: ProductTypeProps) => item.prod_id.toString()}
          renderItem={({ item, index }) => {
            return (
              <Product
                key={`${item.prod_id}.${index}`}
                {...item}
                sharedID={sharedID}
              />
            );
          }}
        />
      )}
    </View>
  );
}
