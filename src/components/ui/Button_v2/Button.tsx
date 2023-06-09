import { ReactNode } from "react";
import Ripple, { RippleProps } from "react-native-material-ripple";
import { Text, View, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Colors } from "constants/styles";

export interface ButtonProps extends RippleProps {
  children: ReactNode | string;
  style: StyleProp<ViewStyle & TextStyle>;

  color?: keyof typeof ColorVariants;
}

const ColorVariants = {
  primary: "#8408D4",
  secondary: Colors.secondary,
  ternary: Colors.active,
  transparent: Colors.primary,
  success: "#28a745",
  warning: "#ffc107",
  alert: "#dc3545",
  disabled: "#6c757d",
};

const defaultStyle = {
  color: "#fff",
};

export default function Button({
  children,
  style: buttonStyle = defaultStyle,
  color = "primary",
  ...rest
}: ButtonProps) {
  return (
    <Ripple
      style={[
        {
          width: "100%",
          padding: 10,
          borderRadius: 50,
          backgroundColor: ColorVariants[color],
        },
      ]}
      {...rest}
    >
      {typeof children === "string" ? (
        <Text
          style={{
            color: "#fff",
          }}
        ></Text>
      ) : (
        children
      )}
    </Ripple>
  );
}
