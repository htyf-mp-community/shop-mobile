import { SkeletonPlaceholder } from "@components/index";
import { View, useWindowDimensions } from "react-native";

export default function Loader() {
  const { width } = useWindowDimensions();
  return (
    <SkeletonPlaceholder
      backgroundColor={"#1f2b3d"}
      highlightColor={"#2a3a52"}
      size={{ width, height: 430 }}
    >
      <View style={{ width, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SkeletonPlaceholder.Item height={40} width={width / 2 - 20} />
          <SkeletonPlaceholder.Item height={40} width={100} />
        </View>
        <SkeletonPlaceholder.Item height={250} width={width - 20} />

        <SkeletonPlaceholder.Item margin={5} height={40} width={width - 20} />

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SkeletonPlaceholder.Item height={45} width={width / 2 - 20} />
          <SkeletonPlaceholder.Item height={45} width={width / 2 - 20} />
        </View>
        <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
          <SkeletonPlaceholder.Item height={45} width={width / 5} />
          <SkeletonPlaceholder.Item height={45} width={width - width / 5} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
