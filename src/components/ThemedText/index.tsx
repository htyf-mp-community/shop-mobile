import { Text, TextProps } from "react-native";
import useColorTheme from "utils/context/ThemeContext";

export default function ThemedText(props: TextProps) {
  const { theme } = useColorTheme();

  return (
    <Text
      {...props}
      style={[
        {
          color: theme.text,
          fontSize: 17,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
}
