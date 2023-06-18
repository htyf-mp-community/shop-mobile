import { ActivityIndicator, View } from "react-native";
import { Colors } from "constants/styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import layout from "constants/layout";
import { StatusBar } from "expo-status-bar";

export default function ModalLoader({ isVisible }: { isVisible: boolean }) {
  return isVisible ? (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        position: "absolute",
        width: layout.screen.width,
        height: layout.screen.height,
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" animated />
      <ActivityIndicator color={"#fff"} size={50} />
    </Animated.View>
  ) : null;
}
