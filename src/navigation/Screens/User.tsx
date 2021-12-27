import History from "../../modules/User/History/History";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import Avatar from "../../modules/User/Avatar/Avatar";
import Settings from "../../modules/User/Settings/Settings";
import Button from "../../components/Button/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

interface UserProps {
  route: RouteProp<any>;
  navigation: StackNavigationProp<any>;
}

export default function User({ route, navigation }: UserProps) {
  return (
    <ScrollView style={styles.container}>
      <Avatar />
      <History />
      <Button
        text="MY REVIEWS"
        style={{ margin: 10, backgroundColor: "#1f1f1f", padding: 15 }}
        callback={() => {
          navigation.navigate("MyReviews");
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
