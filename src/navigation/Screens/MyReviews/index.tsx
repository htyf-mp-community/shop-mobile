import React from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { ProductRatingProps } from "../../../@types/types";
import { SkeletonPlaceholder } from "../../../components";
import { Colors } from "../../../constants/styles";
import useFetch from "../../../utils/hooks/useFetch";
import Ratings from "../../../modules/Ratings/Ratings";

export default function MyReviews() {
  const { data, loading } = useFetch<ProductRatingProps[]>("/ratings/my");

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
        data={data}
        keyExtractor={({ rating_id }) => rating_id.toString()}
        renderItem={({ item }) => <Ratings {...item} />}
      />
    </View>
  );
}
