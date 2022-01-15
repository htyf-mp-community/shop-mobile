import React, { useState } from "react";
import { View, Text, VirtualizedList } from "react-native";
import Product from "../Product/Product";
import { ProductTypeProps } from "../Product/Product";
import styles from "../Product/styles";
import useFetchProducts from "./useFetchProducts";
import Placeholder from "../../components/Placeholder";
import caruselStyles from "./caruselStyles";
import axios from "axios";

interface MostRecentProps {
  path: string;
  title: string;
  sharedID: string;
  refresh: boolean;
  center?: boolean;
}

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
      const cancelToken = axios.CancelToken.source();
      FetchAllProducts(`${path}?skip=${skip}`, cancelToken);
    }
  }

  return (
    <View style={caruselStyles.container}>
      <Text style={[caruselStyles.title]}>{title}</Text>
      {loading && data.length === 0 && <Placeholder loading={loading} />}
      {!!error && (
        <View style={styles.container}>
          <View style={[styles.product, caruselStyles.errorContainer]}>
            <Text style={[caruselStyles.errorText]}>
              {error || "Failed to fetch products"}
            </Text>
          </View>
        </View>
      )}

      {!loading && !error && data.length === 0 && (
        <View style={[caruselStyles.nothing]}>
          <Text style={{ color: "#fff", fontSize: 30 }}>Nothing yet </Text>
        </View>
      )}

      {!error && (
        <VirtualizedList
          data={data}
          onEndReached={onSkip}
          horizontal
          initialNumToRender={2}
          onEndReachedThreshold={0.5}
          getItem={getItem}
          getItemCount={(data) => data.length}
          keyExtractor={(item: ProductTypeProps) => `home.${item.prod_id}}`}
          renderItem={({ item, index }) => (
            <Product
              key={`${item.prod_id}.${index}`}
              {...item}
              sharedID={sharedID}
              fullSize={center}
            />
          )}
        />
      )}
    </View>
  );
}
