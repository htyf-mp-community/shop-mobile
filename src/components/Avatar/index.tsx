import { ImageSourcePropType, Image, Text } from "react-native";
import Animated from "react-native-reanimated";

interface AvatarProps {
  url: ImageSourcePropType;
}

export default function Avatar({ url }: AvatarProps) {
  return (
    <Animated.View
      style={{ margin: 5, flexDirection: "row", alignItems: "center" }}
    >
      <Image source={url} style={{ width: 40, height: 40, borderRadius: 20 }} />
    </Animated.View>
  );
}
