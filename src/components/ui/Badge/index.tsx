import { Colors } from "constants/styles";
import { Text } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

const padding = 5;

export default function Badge({
  amount,
  left = false,
}: {
  amount: number;
  left?: boolean;
}) {
  const outerSize = amount >= 10 ? 35 : 30;
  const innerSize = outerSize - padding * 2;
  return (
    <Animated.View
      style={{
        position: "absolute",
        ...(left ? { left: -5 } : { right: -5 }),
        top: -5,
        width: outerSize,
        height: outerSize,
        zIndex: 20,
        borderRadius: 100,
        padding: padding,
        backgroundColor: Colors.primary,
      }}
    >
      <Text
        style={{
          width: innerSize,
          height: innerSize,
          color: "#fff",
          textAlign: "center",
          backgroundColor: "red",
          textAlignVertical: "center",
          borderRadius: 100,
          fontSize: 14,
        }}
      >
        {amount}
      </Text>
    </Animated.View>
  );
}
