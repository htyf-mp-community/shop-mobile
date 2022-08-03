import { Colors } from "constants/styles";
import { ActivityIndicator, View } from "react-native";

export default function AppLoader() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color="white" size={100} />
    </View>
  );
}
