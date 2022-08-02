import { View, Text, StyleProp, ViewStyle } from "react-native";
import styles from "../styles";
import Ripple from "react-native-material-ripple";
import { ReactNode } from "react";

interface IDetailRowProps {
  children: ReactNode;
  buttonText: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function DetailRow({
  children,
  buttonText,
  containerStyle,
}: IDetailRowProps) {
  return (
    <View style={[styles.row, styles.between, containerStyle]}>
      {children}
      <Ripple rippleColor="#fff" style={styles.button}>
        <Text style={{ color: "rgba(255,255,255,0.8)" }}>{buttonText}</Text>
      </Ripple>
    </View>
  );
}
