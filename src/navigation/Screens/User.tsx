import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/styles";
import Avatar from "../../modules/User/Avatar/Avatar";
import Settings from "../../modules/User/Settings/Settings";

export default function User() {
  return (
    <View style={styles.container}>
      <Avatar />
      <Settings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
