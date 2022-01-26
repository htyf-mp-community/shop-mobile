import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import AddressModal from "./Modals/Address";
import styles from "./styles";

type ModalType = "Address" | "Personal Data" | "Delivery" | "";

export default function AccountSettings() {
  const modal = useSharedValue<ModalType>("");

  const onModal = (type: ModalType) => {
    modal.value = type;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => onModal("Address")}
      >
        <Text style={styles.cardText}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => onModal("Personal Data")}
      >
        <Text style={styles.cardText}>Personal Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => onModal("Delivery")}
      >
        <Text style={styles.cardText}>Delivery</Text>
      </TouchableOpacity>

      <AddressModal show={modal} />
    </View>
  );
}
