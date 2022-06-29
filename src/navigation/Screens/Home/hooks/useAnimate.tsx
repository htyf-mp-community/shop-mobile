import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useState } from "react";

const { width: WIDTH } = Dimensions.get("window");

export default function useAnimate() {
  const translateX = useSharedValue(0); // to -200
  const isOpen = useSharedValue(false);

  const [isVissible, setIsVissible] = useState(false);

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

  function onClose() {
    setIsVissible(false);
    translateX.value = withTiming(0);
    start.value = 0;
  }

  function toggle() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      translateX.value = withTiming(WIDTH * 0.7);
      setIsVissible(true);
    } else {
      translateX.value = withTiming(0);
      start.value = 0;
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
  };
}
