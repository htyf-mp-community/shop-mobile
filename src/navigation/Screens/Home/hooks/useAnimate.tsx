import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import { useState } from "react";

import { Gesture } from "react-native-gesture-handler";
import layout from "constants/layout";

export default function useAnimate() {
  const translateX = useSharedValue(0); // to -200
  const isOpen = useSharedValue(false);

  const context = useSharedValue(0);

  const [isVissible, setIsVissible] = useState(false);

  const onGestureEvent = Gesture.Pan()
    .onStart(() => {
      context.value = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      if (translationX + context.value > 0)
        translateX.value = translationX + context.value;
    })
    .onEnd(() => {
      if (translateX.value < layout.window.width / 1.5) {
        translateX.value = withTiming(0);
        isOpen.value = false;
      } else {
        isOpen.value = true;
      }

      runOnJS(setIsVissible)(isOpen.value);
    })
    .enabled(isVissible);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, layout.window.width / 4],
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
      [0, layout.window.width * 0.7],
      [-300, 0]
    );
    return {
      transform: [{ translateX: translationX }],
    };
  });

  function onClose() {
    setIsVissible(false);
    translateX.value = withTiming(0);
  }

  function toggle() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      translateX.value = withTiming(layout.window.width * 0.7, {
        duration: 200,
      });
      setIsVissible(true);
    } else {
      translateX.value = withTiming(0, {
        duration: 200,
      });

      setIsVissible(false);
    }
  }

  return {
    toggle,
    animatedButtons,
    animatedStyle,
    isOpen,
    isVissible,
    onClose,
    onGestureEvent,
  };
}
