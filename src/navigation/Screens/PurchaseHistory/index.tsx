import React from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import { SkeletonPlaceholder } from "../../../components";
import History from "./components/History";

import usePurchaseHistory from "./hooks/usePurchaseHistory";

export default function PurchaseHistory() {
  const { data, loading } = usePurchaseHistory();

  const result = data?.history || [];

  const { width, height } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      {loading && typeof data?.history === "undefined" && (
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
        renderItem={({ item, index }) => (
          <History
            separator={result[index]?.date !== result[index - 1]?.date}
            {...item}
          />
        )}
      />
    </View>
  );
}
