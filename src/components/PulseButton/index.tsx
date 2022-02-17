import { ReactNode } from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import useColorTheme from "utils/context/ThemeContext";

interface PulseButtonProps {
  text?: string;
  onPress: () => void;
  icon?: ReactNode;
  styles?: StyleProp<ViewStyle>;
  pulseColor?: string;
}

const button: StyleProp<ViewStyle> = {
  padding: 5,
  minWidth: 40,
  minHeight: 40,
  justifyContent: "center",
  alignItems: "center",
};

export default function PulseButton({
  text,
  icon,
  onPress,
  styles,
  pulseColor,
}: PulseButtonProps) {
  const { theme } = useColorTheme();
  if (Platform.OS === "ios") {
    return (
      <TouchableOpacity onPress={onPress} style={[button, styles]}>
        <Text
          style={{
            color: theme.text,
            fontFamily: "PoppinsRegular",
            fontSize: 18,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(
        pulseColor ?? "rgba(255,255,255,0.2)",
        !!icon
      )}
    >
      <View style={[button, styles]}>
        {icon ?? (
          <Text
            style={{
              color: theme.text,
              fontFamily: "PoppinsRegular",
              fontSize: 18,
            }}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}
