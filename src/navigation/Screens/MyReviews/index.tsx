import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading && <ActivityIndicator size="large" />}
      <FlatList
        data={data as Reviews[]}
        keyExtractor={({ rating_id }) => rating_id.toString()}
        renderItem={({ item }) => <Ratings {...item} />}
      />
    </View>
  );
}
