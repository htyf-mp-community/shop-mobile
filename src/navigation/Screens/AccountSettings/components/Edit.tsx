import { TouchableNativeFeedback, View, Text } from "react-native";

export default function Edit({ onPress }: { onPress: () => void }) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,255,255,0.1)",
        false
      )}
      onPress={onPress}
      style={{
        borderRadius: 10,
      }}
    >
      <View style={{ padding: 5, width: 60, justifyContent: "center" }}>
        <Text
          style={{
            color: "#00D85D",
            fontFamily: "PoppinsRegular",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Edit
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}
