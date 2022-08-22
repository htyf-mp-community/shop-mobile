import { View } from "react-native";
import { SkeletonPlaceholder } from "components";

export const SkeletonRow = () => (
  <SkeletonPlaceholder
    marginVertical={1.5}
    size={(size) => ({ width: size.width - 20, height: 60 })}
  >
    <View style={{ flex: 1, alignItems: "center" }}>
      <SkeletonPlaceholder.Item width={(w) => w - 20} height={55} />
    </View>
  </SkeletonPlaceholder>
);

export const SkeletonDescription = () => (
  <SkeletonPlaceholder
    size={({ width }) => ({ width: width - 20, height: 200 })}
  >
    <View style={{ flex: 1, alignItems: "center" }}>
      {new Array(6).fill({}).map((_, i) => (
        <SkeletonPlaceholder.Item key={i} width={(w) => w - 20} height={30} />
      ))}
    </View>
  </SkeletonPlaceholder>
);

export const ButtonsLoader = () => (
  <SkeletonPlaceholder size={(d) => ({ width: d.width - 20, height: 90 })}>
    <View style={{ flex: 1 }}>
      <SkeletonPlaceholder.Item width={(w) => w - 20} height={60} />
    </View>
  </SkeletonPlaceholder>
);
