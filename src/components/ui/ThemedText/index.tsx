import { Text, TextProps } from "react-native";
import useColorTheme from "utils/context/ThemeContext";

export default function ThemedText({ style, ...rest }: TextProps) {
  const { theme } = useColorTheme();

  return (
    <Text
      {...rest}
      style={[
        {
          color: theme.text,
          fontSize: 17,
        },
        style,
      ]}
    >
      {rest.children}
    </Text>
  );
}
