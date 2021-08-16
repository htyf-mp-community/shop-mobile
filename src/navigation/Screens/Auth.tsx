import React from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../../modules/AuthForm";
import { Colors } from "../../constants/styles";
import { API } from "../../constants/routes";

type OnSubmitType = {
  email: string;
  password: string;
};

export default function Auth() {
  async function onSubmit({ email, password }: OnSubmitType) {
    try {
      const response = await fetch(API + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <AuthForm onSubmit={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
  },
});
