import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Colors, h3 } from "../../constants/styles";
import Product, { ProductTypeProps } from "../../modules/Product/Product";

export default function SearchResults({ route }: any) {
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text
        style={[
          h3,
          { fontFamily: "PoppinsBold", padding: 10, paddingBottom: 15 },
        ]}
      >
        Matching Products
      </Text>

      <FlatList
        keyExtractor={(id) => id.prod_id.toString()}
        data={result || []}
        renderItem={({ item: prod }: { item: ProductTypeProps }) => {
          return (
            <Product
              key={prod.prod_id}
              sharedID="SearchResult"
              fullSize={true}
              {...prod}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
