import { Text } from "react-native";
import { Fonts } from "constants/styles";

export default function Description({ description }: { description: string }) {
  return (
    <Text
      style={{
        color: "rgba(255,255,255,0.8)",
        fontSize: 19,
        fontFamily: Fonts.PoppinsRegular,
      }}
    >
      {description}
    </Text>
  );
}
