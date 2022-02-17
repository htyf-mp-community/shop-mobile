import BackButton from "../BackButton/index";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styles from "./Header.styles";
interface HeaderProps {
  children?: ReactNode;
  extraStyles?: StyleProp<ViewStyle>;
}

export default function Header({ children, extraStyles }: HeaderProps) {
  return (
    <View style={[styles.header, extraStyles]}>
      <BackButton />

      {children}
    </View>
  );
}
