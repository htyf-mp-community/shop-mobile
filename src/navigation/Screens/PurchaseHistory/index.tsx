import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Colors } from "../../../constants/styles";
import { SkeletonPlaceholder } from "../../../components";
import History from "./components/History";

import usePurchaseHistory from "./hooks/usePurchaseHistory";

export default function PurchaseHistory() {
  const [skip, setSkip] = useState(0);
  const { data, loading } = usePurchaseHistory();
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
      <FlatList
        onEndReached={() => setSkip((prev) => prev + 5)}
        data={result}
        keyExtractor={(arg) => arg.payment_id!}
        initialNumToRender={6}
        renderItem={({ item, index }) => <History {...item} />}
      />
    </View>
  );
}
