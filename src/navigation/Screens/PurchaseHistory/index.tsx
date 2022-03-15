import { useIsFocused } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import { HistoryResponse } from "../../../@types/types";
import useFetch from "../../../utils/hooks/useFetch";
import { structureOutput } from "./structure";
import { SkeletonPlaceholder } from "../../../components";
import History from "./components/History";

export default function PurchaseHistory() {
  const isFocused = useIsFocused();

  const { data, loading } = useFetch<HistoryResponse>(
    `/payments/history?skip=0`,
    [], // Why there was isFocued?
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
        initialNumToRender={6}
        renderItem={({ item }) => <History products={item} />}
      />
    </View>
  );
}
