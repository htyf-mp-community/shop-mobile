import React from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

interface DotsProps {
  arr: any[];
  x: Animated.Value;
}

export default function Dots({ arr, x }: DotsProps) {
  return (
    <>
      {arr.map((_: any, i: number) => {
        const backgroundColor = x.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: ["grey", "white", "grey"],
          extrapolate: "clamp",
        });

        const scale = x.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.8, 1.1, 0.8],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            style={{
              width: 15,
              height: 10,
              backgroundColor: backgroundColor,
              borderRadius: 100,
              margin: 4,
              transform: [{ scale }],
            }}
          ></Animated.View>
        );
      })}
    </>
  );
}
