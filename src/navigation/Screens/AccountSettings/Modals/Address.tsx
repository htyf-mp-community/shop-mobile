import { useWindowDimensions, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styles from "../styles";
import { Input } from "@components/index";

interface AddressModalProps {
  show: Animated.SharedValue<string>;
}

export default function AddressModal({ show }: AddressModalProps) {
  const { width, height } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(show.value === "Address" ? 0 : height) },
    ],
  }));

  function onLeave() {
    show.value = "";
  }

  return (
    <GestureDetector>
      <Animated.View
        style={[
          {
            width,
            height,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.25)",
          },
          animatedStyle,
        ]}
      >
        <View style={styles.innerAddressModal}>
          <Input
            value=""
            placeholder=""
            name="City"
            labelStyle={{ color: "#fff" }}
          />
          <Input
            value=""
            placeholder=""
            name="Street"
            labelStyle={{ color: "#fff" }}
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
