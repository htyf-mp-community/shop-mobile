import Color from "color";
import { Button, Input, ValidatedInput } from "components";
import layout from "constants/layout";
import Animated from "react-native-reanimated";
import { Text, View } from "react-native";
import { ReactNode } from "react";
import Ripple from "react-native-material-ripple";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { Colors } from "constants/styles";

interface StepProps {
  children?: ReactNode;
}

const padding = 10;

export default function Step({ children }: StepProps) {
  return (
    <Animated.View
      style={{
        width: layout.screen.width,
        height: "100%",
        padding,
        backgroundColor: Color(Colors.secondary).alpha(Math.random()).hex(),
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </Animated.View>
  );
}
