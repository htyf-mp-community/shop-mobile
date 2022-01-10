import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import Avatar from "../../../modules/User/Avatar/Avatar";
import Settings from "../../../modules/User/Settings/Settings";
import Button from "../../../components/Button/Button";
import { ScreenNavigationProps } from "../../../@types/types";

export default function User({
  navigation,
}: Required<ScreenNavigationProps<"User">>) {
  return (
    <ScrollView style={styles.container}>
      <Avatar />

      <Button
        text="PURCHASE HISTORY"
        style={{
          margin: 10,
          backgroundColor: Colors.primary100,
          padding: 15,
          marginTop: 20,
        }}
        callback={() => {
          navigation.navigate("PurchaseHistory");
        }}
      />

      <Button
        text="MY REVIEWS"
        style={{ margin: 10, backgroundColor: Colors.primary100, padding: 15 }}
        callback={() => {
          navigation.navigate("MyReviews");
        }}
      />
      <Button
        text="ACCOUNT SETTINGS"
        style={{ margin: 10, backgroundColor: Colors.primary100, padding: 15 }}
        callback={() => {
          navigation.navigate("AccountSettings");
        }}
      />
      <Settings />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
