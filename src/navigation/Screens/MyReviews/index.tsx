import React from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { SkeletonPlaceholder } from "../../../components";
import { Colors } from "../../../constants/styles";
import Ratings from "../../../modules/Ratings/Ratings";
import { useUser } from "utils/context/UserContext";
import { gql, useQuery } from "@apollo/client";

const GET_RATINGS = gql`
  query {
    ratings {
      rating_id
      title
      description
      rating
    }
  }
`;

export default function MyReviews() {
  const { user } = useUser();
  const { data, loading } = useQuery(GET_RATINGS, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

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

      <FlatList
        initialNumToRender={2}
        data={data?.ratings || []}
        keyExtractor={({ rating_id }) => rating_id.toString()}
        renderItem={({ item }) => <Ratings {...item} />}
      />
    </View>
  );
}
