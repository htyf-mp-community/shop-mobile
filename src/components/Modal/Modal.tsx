import styles from "./Modal.styles";
import { ReactNode } from "react";

import { Modal as RNModal, Pressable, View } from "react-native";
import Button from "components/Button/Button";

interface ModalProps {
  children: ReactNode;
  onDismiss: () => void;
  vissible: boolean;

  onCancel: () => void;
  onAccept: () => void;
}

export default function Modal({ children, onDismiss, vissible }: ModalProps) {
  return (
    <RNModal animationType="fade" transparent visible={vissible}>
      <Pressable style={styles.container} onPress={onDismiss}>
        <View style={styles.inner}>
          <View>{children}</View>
          <View style={styles.buttons}>
            <Button
              text="Cancel"
              style={{ backgroundColor: "rgba(255,0,0,0.2)", marginRight: 5 }}
            />
            <Button
              text="Ok"
              style={{
                backgroundColor: "rgba(0,255,0,0.2)",
                paddingHorizontal: 15,
              }}
            />
          </View>
        </View>
      </Pressable>
    </RNModal>
  );
}
