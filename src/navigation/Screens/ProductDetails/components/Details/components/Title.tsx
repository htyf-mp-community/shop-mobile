import { View, Text } from "react-native";
import styles from "../styles";

export default function Title({ title }: { title: string }) {
  return (
    <View style={[styles.row, styles.between]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
