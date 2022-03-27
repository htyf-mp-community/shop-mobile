import { AntDesign } from "@expo/vector-icons";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface IconProps {
  state: "IN" | "NOT" | "";
}

export default function Icon({ state }: IconProps) {
  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut}>
      <AntDesign
        name={state === "IN" ? "heart" : "hearto"}
        size={26}
        color="white"
      />
    </Animated.View>
  );
}
