import React from "react";
import {
  View,
  FlatList,
  useWindowDimensions,
  VirtualizedList,
} from "react-native";
import { SkeletonPlaceholder } from "../../../components";
import { Colors } from "../../../constants/styles";
import Ratings from "../../../modules/Ratings/Ratings";
import useMyReviews, { Rating } from "./useMyReviews";

export default function MyReviews() {
  const { data, loading, setSkip } = useMyReviews();
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
        getItem={(item, index) => item[index] as Rating}
        getItemCount={(item) => item.length}
        initialNumToRender={4}
        data={data?.ratings}
        keyExtractor={({ rating_id }: Rating) => rating_id.toString()}
        renderItem={({ item }) => <Ratings {...item} />}
      />
    </View>
  );
}
