import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import useColorTheme from "../../context/ThemeContext";

interface ContainerProps {
  children: ReactNode;
  centerHorizontal?: boolean;
  centerVertical?: boolean;
  extraStyles?: StyleProp<ViewStyle>;
}

export default function Container({
  children,
  centerHorizontal,
  centerVertical,
  extraStyles,
}: ContainerProps) {
  const { theme } = useColorTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.primary,
          justifyContent: centerHorizontal ? "center" : undefined,
          alignItems: centerVertical ? "center" : undefined,
        },
        extraStyles,
      ]}
    >
      {children}
    </View>
  );
}
