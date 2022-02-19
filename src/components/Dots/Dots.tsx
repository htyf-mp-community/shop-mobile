import React from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

interface DotsProps {
  arr: any[];
  x: Animated.Value;
}

/**
 * @param {Array} arr length of the Array represents ammount of dots
 * @param {Animated.Value} x Based on this value, component interpolates dots current active position
 **/

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
              width: 10,
              height: 10,
              backgroundColor: backgroundColor,
              borderRadius: 100,
              margin: 4,
              zIndex: 50,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </>
  );
}
