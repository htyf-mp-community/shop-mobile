import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./Modal.styles";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onDismiss: () => void;
  width?: number;
  height?: number;
}

export default function Modal({ children, onDismiss }: ModalProps) {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.overlay}
        onPress={onDismiss}
      ></TouchableOpacity>
      <Animated.View
        style={[styles.modal, {}]}
        entering={SlideInDown}
        exiting={SlideOutDown}
      >
        {children}
      </Animated.View>
    </View>
  );
}
