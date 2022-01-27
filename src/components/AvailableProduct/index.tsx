interface AvailableProps {
  quantity: number;
  styles?: StyleProp<ViewStyle>;
}
import { View, Text, StyleProp, ViewStyle } from "react-native";

export default function Available({ quantity, styles }: AvailableProps) {
  const isInStock = quantity > 0;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderRadius: 5,
          backgroundColor: !isInStock
            ? "rgba(255,0,0,0.2)"
            : "rgba(0,255,0,0.15)",
        },
        styles,
      ]}
    >
      <View
        testID="STATUS.INDICATOR"
        style={{
          width: 10,
          height: 10,
          backgroundColor: isInStock ? "green" : "red",
          borderRadius: 10,
        }}
      />
      <Text
        style={{ marginLeft: 5, color: isInStock ? "white" : "red" }}
        testID="TEXT.STATUS"
      >
        {isInStock ? "Available" : "Not Available"}
      </Text>
    </View>
  );
}
