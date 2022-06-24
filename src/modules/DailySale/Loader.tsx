import { SkeletonPlaceholder } from "@components/index";
import { View } from "react-native";

export default function Loader() {
  return (
    <SkeletonPlaceholder
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
      size={({ width }) => ({ width, height: 430 })}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <SkeletonPlaceholder.Item width={(w) => w * 0.95} height={50} />
        <SkeletonPlaceholder.Item width={(w) => w * 0.95} height={250} />
        <SkeletonPlaceholder.Item width={(w) => w * 0.95} height={50} />
        <SkeletonPlaceholder.Item width={(w) => w * 0.95} height={50} />
      </View>
    </SkeletonPlaceholder>
  );
}
