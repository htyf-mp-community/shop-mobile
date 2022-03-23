import { Colors } from "constants/styles";
import { Text, View } from "react-native";

export default function Badge({
  amount,
  left = false,
}: {
  amount: number;
  left?: boolean;
}) {
  return (
    <View
      style={{
        position: "absolute",
        ...(left ? { left: -5 } : { right: -5 }),
        top: 5,
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
    </View>
  );
}
