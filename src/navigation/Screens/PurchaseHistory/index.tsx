import { useIsFocused } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import useFetch from "../../../hooks/useFetch";
import Product from "../../../modules/Product/Product";
import { structureOutput } from "./structure";

export default function PurchaseHistory() {
  const isFocused = useIsFocused();
  const [skip, setSkip] = useState(0);

  const { data, error, loading } = useFetch<any>(`/payments/history?skip=0`, [
    isFocused,
  ]);

  function onReachEnd() {
    setSkip(skip + 5);
  }

  const result = useMemo(() => structureOutput(data), [data]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={result}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 26,
                fontFamily: "PoppinsBold",
                marginLeft: 10,
              }}
            >
              {item[0].details.date}
            </Text>

            <FlatList
              data={item}
              keyExtractor={({ details }) => details.purchase_id.toString()}
              renderItem={({ item }) => (
                <Product
                  {...item.product}
                  ammount={0}
                  sharedID="HISTORY"
                  fullSize
                />
              )}
            />
          </View>
        )}
      />
    </View>
  );
}
