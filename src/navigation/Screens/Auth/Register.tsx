import React from "react";
import AuthForm from "../../../modules/AuthForm/AuthForm";
import useAuth from "../../../hooks/useAuth";
import { View, Text } from "react-native";
import useColorTheme from "../../../context/ThemeContext";
import styles from "./styles";
import { Button } from "../../../components";
import AuthModal from "./Modal";

export default function RegisterScreen({ navigation }: any) {
  const { onRegister, error, status, onClear } = useAuth("register");
  const { theme } = useColorTheme();

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {!status.activated && status.status === "FINISHED" && (
        <AuthModal>
          <Text style={[styles.text, { color: theme.text }]}>
            Verify your email
          </Text>
          <Text style={[styles.subText, { color: theme.text }]}>
            Confirm your account by clicking link we sent you on your email
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
    </View>
  );
}
