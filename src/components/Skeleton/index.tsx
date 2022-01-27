import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

interface SkeletonProps {
  children: React.ReactElement;
  backgroundColor: string;
  highlightColor: string;

  size: {
    width: number;
    height: number;
  };
}

const Skeleton = ({
  children,
  backgroundColor,
  highlightColor,
  size,
}: SkeletonProps) => {
  const shared = useSharedValue(0);

  React.useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 1000 }), Infinity);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [size ? -size.width : 0, size ? size.width : 0]
        ),
      },
    ],
  }));

  return (
    <MaskedView
      maskElement={children}
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      <View style={[styles.background, { backgroundColor }]} />
      <Reanimated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={["transparent", "black", "transparent"]}
            />
          }
        >
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: highlightColor },
            ]}
          />
        </MaskedView>
      </Reanimated.View>
    </MaskedView>
  );
};

Skeleton.Item = ({
  width,
  height,
  margin,
}: {
  width: number;
  height: number;
  margin?: number;
}) => (
  <View
    style={{
      width,
      height,
      margin,
      marginTop: 10,
      backgroundColor: "lightgrey",
      borderRadius: 5,
    }}
  />
);

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    overflow: "hidden",
  },
});

export default Skeleton;
