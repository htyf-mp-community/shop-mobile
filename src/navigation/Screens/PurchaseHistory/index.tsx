import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Colors } from "../../../constants/styles";
import { SkeletonPlaceholder } from "../../../components";
import History from "./components/History";

import usePurchaseHistory from "./hooks/usePurchaseHistory";

export default function PurchaseHistory() {
  const [skip, setSkip] = useState(0);
  const { data, loading, fetchMore } = usePurchaseHistory();
  const result = data?.history || [];

  useEffect(() => {
    fetchMore({
      variables: { skip },

      /* Depracated */
      updateQuery: (previousQueryResult, options) => {
        return {
          history: [
            ...previousQueryResult.history,
            ...(options.fetchMoreResult?.history ?? []),
          ],
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
      <FlatList
        onEndReached={() => setSkip((prev) => prev + 5)}
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
