import styles from "../styles";
import { View, Text } from "react-native";
import Edit from "./Edit";

interface BlockProps {
  text: string;
  label: string;
  onPress: () => void;
}

export default function Block({ text, onPress, label }: BlockProps) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockLabel}>{label}</Text>
      <View style={styles.blockRow}>
        <Text style={styles.blockText}>{text}</Text>
        <Edit onPress={onPress} />
      </View>
    </View>
  );
}
