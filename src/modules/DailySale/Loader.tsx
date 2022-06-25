import { SkeletonPlaceholder } from "@components/index";
import { View } from "react-native";

export default function Loader() {
  return (
    <SkeletonPlaceholder
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
      size={({ width }) => ({ width, height: 445 })}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <SkeletonPlaceholder.Item width={(w) => w * 0.95} height={300} />
        <SkeletonPlaceholder.Item width={(w) => w * 0.95} height={50} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <SkeletonPlaceholder.Item
            marginRight={5}
            width={(w) => w * 0.15}
            height={60}
          />
          <SkeletonPlaceholder.Item width={(w) => w * 0.77} height={60} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
