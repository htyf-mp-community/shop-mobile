import { Fonts } from "constants/styles";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default function FilterOptionContainer({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}
