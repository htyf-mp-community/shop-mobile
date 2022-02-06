import styles from "../AccountSettings.styles";
import { View, Text } from "react-native";
import Edit from "./Edit";

export default function Block({
  text,
  onPress,
  label,
}: {
  text: string;
  label: string;
  onPress: () => void;
}) {
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
