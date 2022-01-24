import React, { useState } from "react";
import { View, Text, VirtualizedList } from "react-native";
import Product from "../Product/Product";
import { ProductTypeProps } from "../Product/Product";
import Placeholder from "../../components/Placeholder";
import caruselStyles from "./caruselStyles";
import { notEmpty } from "../../functions/typecheckers";
import EmptyList from "./Info";
import useFetchProducts from "./useFetchProducts";
import axios from "axios";

interface MostRecentProps {
  path: string;
  title: string;
  sharedID: string;
  refresh: boolean;
  center?: boolean;
}

const getItem = (data: ProductTypeProps[], key: number) => {
  return data[key];
};

export default function ProductsCarusel({
  path,
  title,
  sharedID,
  refresh,
  center = false,
}: MostRecentProps) {
  const { loading, data, error, hasMore, FetchAllProducts } = useFetchProducts<
    ProductTypeProps[]
  >(`${path}?skip=0`, [refresh]);

  const [skip, setSkip] = useState(5);

  async function onSkip() {
    if (hasMore) {
      setSkip(skip + 5);
      const cancelToken = axios.CancelToken.source();
      await FetchAllProducts(`${path}?skip=${skip}`, cancelToken);
    }
  }

  if (!notEmpty(data) && loading) {
    return <Placeholder />;
  }

  return (
    <View style={caruselStyles.container}>
      <Text style={[caruselStyles.title]}>{title}</Text>

      {!!error && <EmptyList variant="error" error={error} />}

      {!error && data && (
        <VirtualizedList
          ListEmptyComponent={EmptyList}
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
