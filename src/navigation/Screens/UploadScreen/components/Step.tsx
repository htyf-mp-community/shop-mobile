import Color from "color";
import { Button, Input, ValidatedInput } from "components";
import layout from "constants/layout";
import Animated from "react-native-reanimated";
import { Text, View } from "react-native";
import { ReactNode } from "react";
import Ripple from "react-native-material-ripple";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";

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
      }}
    >
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{
            name: "",
            price: "",
          }}
        >
          {(f) => (
            <>
              <ValidatedInput name="name" style={{ marginTop: 10 }} {...f} />
              <ValidatedInput name="price" style={{ marginTop: 10 }} {...f} />
            </>
          )}
        </Formik>
      </View>
    </Animated.View>
  );
}
