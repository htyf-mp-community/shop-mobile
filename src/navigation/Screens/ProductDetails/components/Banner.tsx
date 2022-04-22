import { Padding } from "constants/styles";
import { View, Text } from "react-native";

interface BannerProps {
  text: string;
  backgroundColor: string;
  color: string;
}

export default function Banner({ text, color, backgroundColor }: BannerProps) {
  return (
    <View
      style={{
        marginRight: 10,
        padding: Padding.medium,
        backgroundColor,
        borderRadius: 5,
      }}
    >
      <Text style={{ color }}>{text}</Text>
    </View>
  );
}
