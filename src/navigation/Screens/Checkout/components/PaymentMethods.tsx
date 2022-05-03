import { View, Text, FlatList, Pressable } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Colors } from "../../../../constants/styles";

const AVAILABLE_METHODS = [
  "Visa",
  "Blik",
  "Apple Pay",
  "Google Pay",
  "Mastercard",
];

export default function PaymentMethods() {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={AVAILABLE_METHODS}
      keyExtractor={(name) => name}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => console.log("pressed")}>
            <Animated.View
              style={{
                width: 175,
                height: 85,
                backgroundColor: Colors.primary100,
                marginLeft: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "PoppinsRegular",
                  color: "#fff",
                }}
              >
                {item}
              </Text>
            </Animated.View>
          </Pressable>
        );
      }}
    />
  );
}
