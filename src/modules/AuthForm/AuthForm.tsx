import React, { useState } from "react";
import { ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Colors, h1, radius } from "../../constants/styles";
import useListenKeyboard from "../../hooks/useListenKeyboard";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type AuthFormProps = {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  header: string;
  error?: string;
};

export default function AuthForm({ onSubmit, header, error }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [EmailError, setEmailError] = useState(!!error);
  const [PasswordError, setPasswordError] = useState(!!error);

  async function Submit() {
    if (email.length > 0 && email.includes("@")) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }

    if (password.length > 5) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (password.length > 5 && email.length > 0) {
      onSubmit({ email, password });
    }
  }

  const { status } = useListenKeyboard();

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={[styles.form, { paddingTop: status === "open" ? 10 : 100 }]}
    >
      <Text style={[h1, { fontWeight: "bold" }]}>{header}</Text>
      <Text style={{ color: "red", fontSize: 20 }}>{error}</Text>
      <Input
        value={email}
        setValue={setEmail}
        name={"E-mail"}
        placeholder="Email"
        style={{
          ...styles.input,
          borderColor: EmailError ? "red" : Colors.text,
          color: EmailError ? "red" : Colors.text,
        }}
        placeholderColor={EmailError ? "red" : Colors.text}
        labelStyle={{ color: EmailError ? "red" : Colors.text }}
        keyboardType="email-address"
        helperText="6-60 characters"
      />
      <Input
        value={password}
        setValue={setPassword}
        name={"Password"}
        keyboardType="default"
        placeholder="Password"
        style={{
          ...styles.input,
          borderColor: PasswordError ? "red" : Colors.text,
          color: PasswordError ? "red" : Colors.text,
        }}
        placeholderColor={PasswordError ? "red" : Colors.text}
        labelStyle={{ color: PasswordError ? "red" : Colors.text }}
        secureTextEntry={true}
        helperText="atleast 6 characters long"
      />
      <Button
        text={header.toUpperCase()}
        callback={Submit}
        style={styles.btn}
        fontStyle={{ fontWeight: "bold" }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.primary200,
    marginTop: 5,
  },
  btn: {
    width: SCREEN_WIDTH * 0.45,
    marginTop: 20,
    padding: 15,
    color: Colors.text,
    justifyContent: "center",
    borderRadius: radius.medium,
  },
});
