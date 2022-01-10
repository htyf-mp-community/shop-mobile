import React from "react";
import { View, Modal, Text } from "react-native";
import { Colors } from "../../constants/styles";

interface PopUpProps {
  vissible: boolean;
}

export default function PopUpCarusel() {
  return (
    <Modal animationType="slide" visible={false}>
      <Text>Modal</Text>
    </Modal>
  );
}
