import History from "../../modules/User/History/History";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import Avatar from "../../modules/User/Avatar/Avatar";
import Settings from "../../modules/User/Settings/Settings";

export default function User() {
  return (
    <View style={styles.container}>
      <Avatar />
      <Settings />
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
