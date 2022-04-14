import { Colors } from "constants/styles";
import { Text } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

export default function Badge({
  amount,
  left = false,
}: {
  amount: number | string;
  left?: boolean;
}) {
  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      style={{
        position: "absolute",
        ...(left ? { left: -5 } : { right: -5 }),
        top: 0,
        width: 30,
        height: 30,
        zIndex: 20,
        borderRadius: 100,
        padding: 5,
        backgroundColor: Colors.primary,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: "PoppinsBold",
          textAlign: "center",
          backgroundColor: "red",
          borderRadius: 100,
        }}
      >
        {amount}
      </Text>
    </Animated.View>
  );
}
