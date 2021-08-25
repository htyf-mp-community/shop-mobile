import React from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default function Dots({ arr, x }: { arr: any[]; x: Animated.Value }) {
  return (
    <>
      {arr.map((_: any, i: number) => {
        const backgroundColor = x.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [
            "rgba(255,255,255,0.2)",
            "white",
            "rgba(255,255,255,0.2)",
          ],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={{
              width: 15,
              height: 15,
              backgroundColor: backgroundColor,
              borderRadius: 100,
              margin: 4,
            }}
          ></Animated.View>
        );
      })}
    </>
  );
}
