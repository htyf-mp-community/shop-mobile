import { useWindowDimensions, ActivityIndicator } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Placeholder({}) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        backgroundColor: "#1e293b",
        width: width - 20,
        height: 250,
        margin: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={"#fff"} size="large" />
    </Animated.View>
  );
}
