import React from "react";
import { useWindowDimensions } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

export default function ProductLoader({ loading }: { loading: boolean }) {
  const { width } = useWindowDimensions();
  return (
    <SkeletonContent
      isLoading={loading}
      animationDirection="horizontalRight"
      animationType="shiver"
      boneColor="#1e293b"
      highlightColor="#2a3a54"
      layout={[
        {
          key: "0",
          width: width - 20,
          height: 70,
          marginBottom: 5,
          marginTop: 10,
        },
        {
          key: "1",
          width: width - 20,
          height: 300,
          marginBottom: 5,
          marginTop: 10,
        },
        {
          key: "2",
          width: width - 20,
          height: 70,
          marginBottom: 5,
          marginTop: 10,
        },
      ]}
    />
  );
}
