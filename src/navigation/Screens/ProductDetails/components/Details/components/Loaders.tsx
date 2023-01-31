import { View } from "react-native";
import { SkeletonPlaceholder } from "components";

export const Skeleton = () => {
  return (
    <SkeletonPlaceholder
      size={(size) => ({ width: size.width, height: size.height * 0.8 })}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <SkeletonPlaceholder.Item width={(w) => w - 20} height={50} />
        <SkeletonPlaceholder.Item width={(w) => w - 20} height={50} />
        <SkeletonPlaceholder.Item width={(w) => w - 20} height={50} />
        <SkeletonPlaceholder.Item width={(w) => w - 20} height={50} />
        <SkeletonPlaceholder.Item width={(w) => w - 20} height={35} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <SkeletonPlaceholder.Item width={(w) => w / 2 - 20} height={60} />
          <SkeletonPlaceholder.Item width={(w) => w / 2 - 20} height={60} />
        </View>

        <View style={{ marginTop: 5 }}>
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
          <SkeletonPlaceholder.Item width={(w) => w - 20} height={27.5} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

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
