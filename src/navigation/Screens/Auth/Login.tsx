import React from "react";
import AuthForm from "../../../modules/AuthForm/AuthForm";
import useAuth from "../../../hooks/useAuth";
import { Text, ActivityIndicator } from "react-native";
import AuthModal from "./Modal";
import styles from "./styles";
import useColorTheme from "../../../context/ThemeContext";
import { Button } from "../../../components";
import { Container } from "../../../components";

export default function LoginScreen() {
  const { onLogin, error, loading, onClear } = useAuth("login");
  const { theme } = useColorTheme();

  if (error) {
    return (
      <Container centerVertical>
        <AuthModal>
          <Text style={[styles.text, { color: theme.text, fontSize: 50 }]}>
            Oops...
          </Text>
          <Text style={[styles.subText, { color: theme.text }]}>
            Here is what went wrong: {error}
          </Text>
          <Button
            text="Try Again"
            onPress={onClear}
            style={{ margin: 20, justifyContent: "center" }}
          />
        </AuthModal>
      </Container>
    );
  }

  return (
    <Container centerVertical>
      {loading && !error && (
        <AuthModal>
          <Text style={[styles.text, { color: theme.text }]}>Please Wait</Text>
          <ActivityIndicator size={"large"} color="white" />
        </AuthModal>
      )}

      <AuthForm onSubmit={onLogin} header="Login" />
    </Container>
  );
}
