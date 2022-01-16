import React from "react";
import { useWindowDimensions } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

interface PlaceholderProps {
  loading: boolean;
  ammount?: number;
}

export default function Placeholder({
  loading,
  ammount = 1,
}: PlaceholderProps) {
  const { width } = useWindowDimensions();

  const layoutArrayWithKeys = Array(ammount)
    .fill({
      width: width - 20,
      height: 250,
      marginBottom: 6,
    })
    .map((props, i) => ({ ...props, key: i.toString() }));

  return (
    <SkeletonContent
      containerStyle={{ marginTop: 10, alignItems: "center" }}
      isLoading={loading}
      animationDirection="horizontalRight"
      animationType="shiver"
      boneColor="#1e293b"
      highlightColor="#2a3a54"
      layout={layoutArrayWithKeys}
    />
  );
}
