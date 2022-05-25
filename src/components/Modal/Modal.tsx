import styles from "./Modal.styles";
import { ReactNode } from "react";

import { Modal as RNModal, Pressable, View } from "react-native";
import Button from "components/Button/Button";
import Animated, { SlideInDown } from "react-native-reanimated";
import Color from "color";

interface ModalProps {
  children: ReactNode;
  onDismiss: () => void;
  vissible: boolean;

  onCancel?: () => void;
  onAccept: () => void;
}

export default function Modal({
  children,
  onDismiss,
  vissible,
  onAccept,
  onCancel,
}: ModalProps) {
  return (
    <RNModal animationType="fade" transparent visible={vissible}>
      <Pressable style={styles.container} onPress={onDismiss}>
        {/* Disables previus pressable */}
        <Animated.View entering={SlideInDown} exiting={SlideInDown}>
          <Pressable style={styles.inner}>
            <View style={{ marginBottom: 20 }}>{children}</View>
            <View style={styles.buttons}>
              {!!onCancel && (
                <Button
                  onPress={onCancel}
                  text="Cancel"
                  fontStyle={{ color: "red" }}
                  style={{
                    backgroundColor: Color("red").alpha(0.2).string(),
                    marginRight: 10,
                  }}
                />
              )}
              <Button
                onPress={onAccept}
                text="Yes"
                fontStyle={{ color: "lightgreen" }}
                style={{
                  backgroundColor: Color("green").alpha(0.3).string(),
                  paddingHorizontal: 15,
                }}
              />
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </RNModal>
  );
}
