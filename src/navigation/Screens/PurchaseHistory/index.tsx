import React, { useEffect, useState } from "react";
import { View, FlatList, VirtualizedList, LogBox } from "react-native";
import { Colors } from "../../../constants/styles";
import { SkeletonPlaceholder } from "../../../components";
import RemoveProductsRepetition from "functions/RemoveRepetition";
import History from "./components/History";

import usePurchaseHistory, { IHistory } from "./hooks/usePurchaseHistory";

LogBox.ignoreAllLogs(true);

export default function PurchaseHistory() {
  const [skip, setSkip] = useState(0);
  const { data, loading, fetchMore } = usePurchaseHistory();
  const result = data?.history || [];

  useEffect(() => {
    fetchMore({
      variables: { skip },

      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult?.history) return prev;

        return {
          history: RemoveProductsRepetition(
            [...prev.history, ...fetchMoreResult.history],
            "payment_id"
          ),
        };
      },
    });
  }, [skip]);

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
        onEndReached={() => setSkip((prev) => prev + 5)}
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
