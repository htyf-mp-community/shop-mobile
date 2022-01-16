import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import Placeholder from "../../../components/Placeholder";
import { Colors } from "../../../constants/styles";
import useFetch from "../../../hooks/useFetch";
import Ratings from "../../../modules/Ratings/Ratings";

interface Reviews {
  rating_id: number;
  user_id: number;
  rating: number;
  title: string;
  description: string;
}

export default function MyReviews() {
  const { data, loading } = useFetch<Reviews[]>("/ratings/my");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
      }}
    >
      {loading && <Placeholder ammount={3} loading />}

      <FlatList
        initialNumToRender={2}
        data={data as Reviews[]}
        keyExtractor={({ rating_id }) => rating_id.toString()}
        renderItem={({ item }) => <Ratings {...item} />}
      />
    </View>
  );
}
