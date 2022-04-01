import { useWindowDimensions, View } from "react-native";
import { SkeletonPlaceholder } from "components";

export default function DetailsLoader({ loading }: { loading: boolean }) {
  const { width } = useWindowDimensions();

  return loading ? (
    <SkeletonPlaceholder
      size={{ width, height: 420 }}
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
    >
      <View style={{ width, alignItems: "center" }}>
        <SkeletonPlaceholder.Item height={80} width={width - 20} />
        <SkeletonPlaceholder.Item height={80} width={width - 20} />
        <SkeletonPlaceholder.Item height={260} width={width - 20} />
      </View>
    </SkeletonPlaceholder>
  ) : null;
}
