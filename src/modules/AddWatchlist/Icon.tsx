import { AntDesign } from "@expo/vector-icons";
import Animated, {
  ZoomIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useLayoutEffect } from "react";

interface IconProps {
  state: "IN" | "NOT" | "";
}

export default function Icon({ state }: IconProps) {
  const scale = useSharedValue(1);

  const animatedScale = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [state]
  );

  useLayoutEffect(() => {
    if (state === "IN") {
      scale.value = withSequence(
        withTiming(1.4, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    } else {
    }
  }, [state]);

  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut} style={animatedScale}>
      <AntDesign
        name={state === "IN" ? "heart" : "hearto"}
        size={26}
        color="white"
      />
    </Animated.View>
  );
}
