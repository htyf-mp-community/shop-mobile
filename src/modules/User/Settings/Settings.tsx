import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ENDPOINTS } from "../../../constants/routes";
import { Colors } from "../../../constants/styles";
import { useUser } from "../../../context/UserContext";
import SignOut from "../../Signout/Signout";

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(true);
  const { user } = useUser();

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);

    try {
      console.log(isEnabled);
      axios.post(
        ENDPOINTS.notificationsSettings,
        {
          enable: !isEnabled,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headings}>Settings</Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            padding: 10,
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[styles.headings, { fontSize: 15 }]}>Notifications</Text>
          <Switch
            trackColor={{ false: Colors.text, true: Colors.text }}
            thumbColor={isEnabled ? Colors.secondary100 : "#f4f3f4"}
            value={isEnabled}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
          />
        </View>
        <SignOut />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
  },
  headings: {
    fontFamily: "PoppinsBold",
    fontSize: 25,
    color: Colors.text,
  },
});
