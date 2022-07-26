import React from "react";
import {
  View,
  FlatList,
  VirtualizedList,
  LogBox,
  RefreshControl,
} from "react-native";
import { Colors } from "../../../constants/styles";
import { SkeletonPlaceholder } from "../../../components";
import History from "./components/History";

import usePurchaseHistory, { IHistory } from "./hooks/usePurchaseHistory";

LogBox.ignoreAllLogs(true);

export default function PurchaseHistory() {
  const { data, loading, onEndReached, refreshing, onPullToRefresh } =
    usePurchaseHistory();
  const result = data?.history || [];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      {loading && typeof data?.history === "undefined" && (
        <SkeletonPlaceholder>
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={new Array(3).fill({})}
            keyExtractor={(_, i) => i.toString()}
            renderItem={() => (
              <SkeletonPlaceholder.Item
                height={240}
                width={(width) => width - 20}
              />
            )}
          />
        </SkeletonPlaceholder>
      )}
      <VirtualizedList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        data={result}
        getItem={(d, i) => d[i] as IHistory}
        getItemCount={(d) => d.length}
        keyExtractor={(arg: any) => arg.payment_id!}
        initialNumToRender={6}
        renderItem={({ item, index }) => <History {...item} />}
      />
    </View>
  );
}
