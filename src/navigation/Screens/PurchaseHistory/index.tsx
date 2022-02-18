import { useIsFocused } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import { HistoryResponse } from "../../../@types/types";
import useFetch from "../../../utils/hooks/useFetch";
import Product from "../../../modules/Product";
import { structureOutput } from "./structure";
import Placeholder from "../../../components/Placeholder";
import { SkeletonPlaceholder } from "../../../components";

export default function PurchaseHistory() {
  const isFocused = useIsFocused();

  const { data, loading } = useFetch<HistoryResponse>(
    `/payments/history?skip=0`,
    [isFocused],
    {}
  );

  const result = useMemo(() => structureOutput(data), [data]);

  const { width, height } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      {loading && typeof data.results === "undefined" && (
        <SkeletonPlaceholder
          backgroundColor={"#1f2b3d"}
          highlightColor={"#2a3a52"}
          size={{ width, height }}
        >
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={new Array(3).fill({})}
            keyExtractor={(_, i) => i.toString()}
            renderItem={() => (
              <SkeletonPlaceholder.Item height={240} width={width - 20} />
            )}
          />
        </SkeletonPlaceholder>
      )}
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
                  sharedID={"HISTORY" + item.details.purchase_id}
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
