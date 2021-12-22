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

  //const [more, setMore] = useState(0);

  const { loading, data, error } = useFetchProducts<ProductTypeProps[]>(path, [
    refresh,
    // more,
  ]);

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
      {loading && <ProductLoader />}
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

      {!loading && !error && (
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
          horizontal
          initialNumToRender={2}
          getItem={getItem}
          getItemCount={(data) => data.length}
          keyExtractor={(item: ProductTypeProps) => `home.${item.prod_id}`}
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
