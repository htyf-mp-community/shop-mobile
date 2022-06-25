import { BackButton } from "components";
import { Fonts } from "constants/styles";
import { View, Text, StyleSheet } from "react-native";
import useColorTheme from "utils/context/ThemeContext";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsRegular,
    color: "#fff",
  },
});

interface Props {
  step: number;
}

export default function Header({ step }: Props) {
  const { theme } = useColorTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <BackButton />

      <Text style={styles.heading}>{step}/4: Create product</Text>
    </View>
  );
}
