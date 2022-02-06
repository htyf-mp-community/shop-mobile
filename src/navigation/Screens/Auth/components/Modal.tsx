interface AuthModalProps {
  children: ReactNode;
}

import Animated, { SlideInDown } from "react-native-reanimated";
import styles from "../Auth.styles";
import useColorTheme from "../../../../context/ThemeContext";
import { ReactNode } from "react";

export default function AuthModal({ children }: AuthModalProps) {
  const { theme } = useColorTheme();
  return (
    <Animated.View
      entering={SlideInDown}
      style={[styles.modal, { backgroundColor: theme.primary100 }]}
    >
      {children}
    </Animated.View>
  );
}
