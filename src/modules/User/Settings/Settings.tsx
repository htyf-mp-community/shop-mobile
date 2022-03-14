import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Colors } from "../../../constants/styles";
import useColorTheme from "@utils/context/ThemeContext";
import SignOut from "../../Signout/Signout";
import useSettings from "./useSettings";

export default function Settings() {
  const { current, onThemeChange, theme } = useColorTheme();
  const { isEnabled, toggleSwitch } = useSettings();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.headings,
          { fontSize: 25, color: theme.text, marginBottom: 35 },
        ]}
      >
        App Settings
      </Text>

      <View style={styles.settings}>
        <Text style={[styles.headings, { fontSize: 15, color: theme.text }]}>
          Notifications
        </Text>
        <Switch
          trackColor={{ false: Colors.text, true: Colors.text }}
          thumbColor={isEnabled ? Colors.secondary100 : "#f4f3f4"}
          value={isEnabled}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
        />
      </View>

      <View style={styles.settings}>
        <Text style={[styles.headings, { fontSize: 15, color: theme.text }]}>
          Theme
        </Text>
        <Switch
          value={current !== "light"}
          trackColor={{ false: Colors.text, true: Colors.text }}
          thumbColor={isEnabled ? Colors.secondary100 : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onThemeChange}
        />
      </View>

      <SignOut />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
