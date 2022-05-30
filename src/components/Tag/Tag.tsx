import { Fonts } from "constants/styles";
import { ReactElement, ReactNode } from "react";
import { Text, View } from "react-native";
import Ripple from "react-native-material-ripple";

interface TagProps {
  text: string;
  leftIcon?: ReactNode | ReactElement;
  rightIcon?: ReactNode | ReactElement;
  backgroundColor?: string;
  fontColor?: string;
  onPress?: () => void;
  margin?: number | string;
}

export default function Tag({
  onPress,
  text,
  leftIcon,
  rightIcon,
  ...styles
}: TagProps) {
  return (
    <Ripple
      onPress={onPress}
      style={{
        margin: styles.margin,
        backgroundColor: styles.backgroundColor,
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <View style={{ marginRight: 5 }}>{leftIcon}</View>
      <Text style={{ color: styles.fontColor }}>{text}</Text>
      <View style={{ marginLeft: 5 }}>{rightIcon}</View>
    </Ripple>
  );
}
