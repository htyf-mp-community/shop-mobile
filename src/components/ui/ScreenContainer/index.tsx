import { StyleProp, View, ViewStyle, ViewProps } from "react-native";
import useColorTheme from "utils/context/ThemeContext";

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenContainer({
  children,
  style,
  ...rest
}: ScreenContainerProps) {
  const { theme } = useColorTheme();
  return (
    <View
      style={[{ flex: 1, backgroundColor: theme.primary }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
