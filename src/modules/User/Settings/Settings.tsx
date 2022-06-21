import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useColorTheme from "@utils/context/ThemeContext";
import useSettings from "./useSettings";
import SettingButton from "./components/SettingButton";
import SignOut from "modules/Signout";
import ThemeSheet from "./components/ThemeSheet";

export default function Settings() {
  const { isEnabled, toggleSwitch } = useSettings();
  const { theme } = useColorTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.headings, { fontSize: 25, color: theme.text }]}>
        App Settings
      </Text>

      <ThemeSheet />
      <SettingButton
        onPress={() => {}}
        fadedText={isEnabled ? "enabled" : "disabled"}
        iconExpanded={false}
        primaryText="Notifications"
      />

      <SignOut />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "column",
  },
  headings: {
    fontFamily: "PoppinsBold",
    fontSize: 25,
  },
  settings: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
});
