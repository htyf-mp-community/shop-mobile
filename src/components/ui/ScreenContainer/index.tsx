import { StyleProp, View, ViewStyle } from "react-native";
import useColorTheme from "utils/context/ThemeContext";

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenContainer({
  children,
  style,
}: ScreenContainerProps) {
  const { theme } = useColorTheme();
  return (
    <View style={[{ flex: 1, backgroundColor: theme.primary }, style]}>
      {children}
    </View>
  );
}
