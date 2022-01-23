import { useWindowDimensions, Animated, ActivityIndicator } from "react-native";

export default function Placeholder({}) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
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
