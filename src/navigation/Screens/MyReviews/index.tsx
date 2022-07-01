import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  useWindowDimensions,
  VirtualizedList,
} from "react-native";
import { SkeletonPlaceholder } from "../../../components";
import { Colors } from "../../../constants/styles";
import Ratings from "../../../modules/Ratings/Ratings";
import { useUser } from "utils/context/UserContext";
import { gql, useQuery } from "@apollo/client";
import RemoveProductsRepetition from "functions/RemoveRepetition";

const GET_RATINGS = gql`
  query GetRatings {
    ratings {
      rating_id
      title
      description
      rating
    }
  }
`;

export default function MyReviews() {
  const [skip, setSkip] = useState(0);
  const { user } = useUser();
  const { data, loading, client, fetchMore } = useQuery(GET_RATINGS, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  useEffect(() => {
    fetchMore({
      variables: { skip },

      updateQuery(prev, { fetchMoreResult }): any {
        if (!fetchMoreResult) return prev;

        return {
          auctions: RemoveProductsRepetition(
            [...prev.history, ...fetchMoreResult.history],
            "payment_id"
          ),
        };
      },
    });
    return () => {
      client.stop();
    };
  }, [skip]);

  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
      }}
    >
      {loading && (
        <SkeletonPlaceholder
          backgroundColor={"#1f2b3d"}
          highlightColor={"#2a3a52"}
          size={{ width, height }}
        >
          <FlatList
            style={{ marginTop: 20 }}
            contentContainerStyle={{ alignItems: "center" }}
            data={new Array(3).fill({})}
            keyExtractor={(_, i) => i.toString()}
            renderItem={() => (
              <SkeletonPlaceholder.Item height={240} width={width - 20} />
            )}
          />
        </SkeletonPlaceholder>
      )}

      <VirtualizedList
        onEndReached={() => setSkip((prev) => prev + 5)}
        getItem={(item, index) => item[index]}
        getItemCount={(item) => item.length}
        initialNumToRender={4}
        data={data?.ratings || []}
        keyExtractor={({ rating_id }) => rating_id.toString()}
        renderItem={({ item }: any) => <Ratings {...item} />}
      />
    </View>
  );
}
