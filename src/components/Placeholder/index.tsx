import React from "react";
import { useWindowDimensions } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

interface PlaceholderProps {
  loading: boolean;
}

export default function Placeholder({ loading }: PlaceholderProps) {
  const { width } = useWindowDimensions();
  return (
    <SkeletonContent
      isLoading={loading}
      animationDirection="horizontalRight"
      animationType="shiver"
      boneColor="#1e293b"
      highlightColor="#2a3a54"
      layout={[
        { key: "someId", width: width - 20, height: 250, marginBottom: 6 },
      ]}
    />
  );
}
