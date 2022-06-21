import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useColorTheme from "@utils/context/ThemeContext";
import useSettings from "./useSettings";
import SettingButton from "./components/SettingButton";
import SignOut from "modules/Signout";
import ThemeSheet from "./components/ThemeSheet";

import NotificationsModal from "./components/NotificationsModal";

export default function Settings() {
  const { isEnabled, toggleSwitch } = useSettings();
  const { theme } = useColorTheme();

  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.headings, { fontSize: 25, color: theme.text }]}>
        App Settings
      </Text>

      <ThemeSheet />
      <SettingButton
        onPress={() => setIsVisible(true)}
        fadedText={isEnabled ? "enabled" : "disabled"}
        iconExpanded={false}
        primaryText="Notifications"
      />

      <SignOut />

      {/* Modals */}
      <NotificationsModal
        isEnabled={isEnabled}
        onToggle={toggleSwitch}
        onHide={() => setIsVisible(false)}
        isVisible={isVisible}
      />
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
