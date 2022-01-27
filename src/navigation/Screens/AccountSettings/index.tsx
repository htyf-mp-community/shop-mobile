import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Skeleton from "../../../components/Skeleton";
import useColorTheme from "../../../context/ThemeContext";
import AddressModal from "./Modals/Address";
import styles from "./styles";

type ModalType = "Address" | "Personal Data" | "Delivery" | "";

export default function AccountSettings() {
  const modal = useSharedValue<ModalType>("");

  const onModal = (type: ModalType) => {
    modal.value = type;
  };

  const {
    theme: { primary, primary100 },
  } = useColorTheme();

  return (
    <View style={[styles.container, { backgroundColor: primary }]}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: primary100 }]}
        activeOpacity={0.8}
        onPress={() => onModal("Address")}
      >
        <Text style={styles.cardText}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: primary100 }]}
        activeOpacity={0.8}
        onPress={() => onModal("Personal Data")}
      >
        <Text style={styles.cardText}>Personal Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: primary100 }]}
        activeOpacity={0.8}
        onPress={() => onModal("Delivery")}
      >
        <Text style={styles.cardText}>Delivery</Text>
      </TouchableOpacity>

      <AddressModal show={modal} />
    </View>
  );
}
