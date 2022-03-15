import { Dimensions, FlatList } from "react-native";
import React, { useMemo } from "react";
import Sidebar from "@modules/Sidebar";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { homeElements } from "./data";

const { width: WIDTH } = Dimensions.get("window");

export default function Home() {
  const translateX = useSharedValue(0); // to -200
  const isOpen = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, WIDTH / 4],
      [1, 0.75],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: translateX.value }, { scale }],
    };
  }, []);

  const animatedButtons = useAnimatedStyle(() => {
    const translationX = interpolate(
      translateX.value,
      [0, WIDTH * 0.7],
      [-300, 0]
    );
    return {
      transform: [{ translateX: translationX }],
    };
  });
  const start = useSharedValue(0);

  function toggle() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      translateX.value = withTiming(WIDTH * 0.7);
    } else {
      translateX.value = withTiming(0);
      start.value = 0;
    }
  }

  const data = useMemo(() => homeElements(toggle), []);

  return (
    <Sidebar animatedStyle={animatedStyle} animatedButtons={animatedButtons}>
      <FlatList
        initialNumToRender={5}
        stickyHeaderIndices={[0]}
        bounces
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: { Component, props } }) => {
          return <Component {...props} />;
        }}
      />
    </Sidebar>
  );
}
