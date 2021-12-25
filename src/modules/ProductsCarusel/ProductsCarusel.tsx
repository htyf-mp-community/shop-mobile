import React, { useState } from "react";
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
  center?: boolean;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export default function ProductsCarusel({
  path,
  title,
  sharedID,
  refresh,
  center = false,
}: MostRecentProps) {
  const getItem = (data: ProductTypeProps[], key: number) => {
    return data[key];
  };

  const [skip, setSkip] = useState(5);

  const { loading, data, error, hasMore, FetchAllProducts } = useFetchProducts<
    ProductTypeProps[]
  >(`${path}?skip=0`, [refresh]);

  function onSkip() {
    if (hasMore) {
      setSkip(skip + 5);
      FetchAllProducts(`${path}?skip=${skip}`);
    }
  }

  return (
    <View style={{ width: WIDTH }}>
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
      {loading && data.length === 0 && <ProductLoader />}
      {!!error && (
        <View style={styles.container}>
          <View
            style={[
              styles.product,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text style={{ fontFamily: "PoppinsBold", color: Colors.text }}>
              {error || "Failed to fetch products"}
            </Text>
          </View>
        </View>
      )}

      {!error && (
        <VirtualizedList
          ListEmptyComponent={
            <View
              style={{
                backgroundColor: Colors.primary,
                height: HEIGHT / 3,
                width: WIDTH * 0.95,
              }}
            ></View>
          }
          data={data}
          onEndReached={onSkip}
          horizontal
          initialNumToRender={2}
          onEndReachedThreshold={0.5}
          getItem={getItem}
          getItemCount={(data) => data.length}
          keyExtractor={(item: ProductTypeProps) => `home.${item.prod_id}}`}
          renderItem={({ item, index }) => {
            return (
              <Product
                key={`${item.prod_id}.${index}`}
                {...item}
                sharedID={sharedID}
                fullSize={center}
              />
            );
          }}
        />
      )}
    </View>
  );
}
