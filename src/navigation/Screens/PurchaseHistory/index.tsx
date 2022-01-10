import { useIsFocused } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Colors } from "../../../constants/styles";
import { HistoryResponse } from "../../../@types/types";
import useFetch from "../../../hooks/useFetch";
import Product from "../../../modules/Product/Product";
import { structureOutput } from "./structure";

export default function PurchaseHistory() {
  const isFocused = useIsFocused();
  const [skip, setSkip] = useState(0);

  const { data } = useFetch<HistoryResponse>(
    `/payments/history?skip=0`,
    [isFocused],
    {}
  );

  function onReachEnd() {
    setSkip(skip + 5);
  }

  const result = useMemo(() => structureOutput(data), [data]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <FlatList
        data={result}
        keyExtractor={(_, i) => i.toString()}
        initialNumToRender={3}
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
                  ammount={0}
                  sharedID="HISTORY"
                  fullSize
                  {...item.product}
                />
              )}
            />
          </View>
        )}
      />
    </View>
  );
}
