import React, { useMemo } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import { structureOutput } from "./structure";
import { SkeletonPlaceholder } from "../../../components";
import History from "./components/History";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";

const GET_HISTORY = gql`
  query {
    history {
      product {
        prod_id
        price
        title
        img_id {
          name
          id
        }
      }

      details {
        date
        status
        purchase_id
      }
    }
  }
`;

export default function PurchaseHistory() {
  const { user } = useUser();
  const { data, loading } = useQuery(GET_HISTORY, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  const result = useMemo(
    () => structureOutput({ results: data?.history } as any),
    [data?.history]
  );

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
        renderItem={({ item }) => <History products={item} />}
      />
    </View>
  );
}
