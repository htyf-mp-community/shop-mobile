import { SkeletonPlaceholder } from "components";
import { useWindowDimensions, FlatList } from "react-native";

export default function Loader() {
  const { width, height } = useWindowDimensions();
  return (
    <SkeletonPlaceholder
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
      size={{ width, height }}
    >
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={new Array(3).fill({})}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => (
          <SkeletonPlaceholder.Item height={240} width={width - 20} />
        )}
      />
    </SkeletonPlaceholder>
  );
}
