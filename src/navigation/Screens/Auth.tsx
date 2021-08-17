import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AuthForm from "../../modules/AuthForm";
import { Colors } from "../../constants/styles";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

type OnSubmitType = {
  email: string;
  password: string;
};

export default function Auth() {
  const { SaveUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function onSubmit({ email, password }: OnSubmitType) {
    try {
      setLoading(true);
      const response = await fetch(API + "/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data && data.status === "verified") {
        SaveUser({ user_id: 1, token: data.token, name: email });
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  console.log(error);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <AuthForm onSubmit={onSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
  },
});
