import React from "react";
import AuthForm from "@modules/AuthForm/AuthForm";
import useAuth from "@utils/hooks/useAuth";
import { Text } from "react-native";
import useColorTheme from "@utils/context/ThemeContext";
import styles from "../Auth.styles";
import AuthModal from "../components/Modal";
import { Container, Button } from "@components/index";

export default function RegisterScreen({ navigation }: any) {
  const { onRegister, error, status, onClear } = useAuth("register");
  const { theme } = useColorTheme();

  return (
    <Container centerVertical>
      {!status.activated && status.status === "FINISHED" && (
        <AuthModal>
          <Text style={[styles.text, { color: theme.text }]}>
            Verify your email
          </Text>
          <Text style={[styles.subText, { color: theme.text }]}>
            Confirm your account via link sent on given @
          </Text>
          <Button
            onPress={() =>
              navigation.navigate("Auth", {
                screen: "Login",
              })
            }
            text="Log in"
            style={{ justifyContent: "center", margin: 15 }}
          />
        </AuthModal>
      )}

      {error !== null && (
        <AuthModal>
          <Text style={[styles.text, { color: theme.text, fontSize: 45 }]}>
            Oops...
          </Text>
          <Text style={[styles.subText, { color: theme.text }]}>{error}</Text>
          <Button
            onPress={onClear}
            text="Try again"
            style={{ justifyContent: "center", margin: 15 }}
          />
        </AuthModal>
      )}

      <AuthForm header="Register" onSubmit={onRegister} />
    </Container>
  );
}
