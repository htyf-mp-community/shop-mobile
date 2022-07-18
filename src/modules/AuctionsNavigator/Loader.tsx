import { SkeletonPlaceholder } from "components";
import { ScrollView } from "react-native";

export default function Loader() {
  return (
    <SkeletonPlaceholder
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
      size={({ width }) => ({ width, height: 160 })}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        horizontal
        style={{ width: "100%" }}
      >
        <SkeletonPlaceholder.Item
          margin={5}
          height={150}
          width={(w) => w / 1.5}
        />
        <SkeletonPlaceholder.Item
          margin={5}
          height={150}
          width={(w) => w / 1.5}
        />
      </ScrollView>
    </SkeletonPlaceholder>
  );
}
