import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { Colors, h2, radius } from "../constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type AuthFormProps = {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
};

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);

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

  return (
    <View style={styles.form}>
      <Text style={h2}>Login</Text>
      <Input
        value={email}
        setValue={setEmail}
        name="e-mail"
        placeholder="email"
        style={{
          ...styles.input,
          borderColor: EmailError ? "red" : Colors.primary100,
          color: EmailError ? "red" : Colors.primary100,
        }}
        placeholderColor={Colors.primary100}
        labelStyle={{ color: Colors.primary100 }}
      />
      <Input
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="password"
        style={{
          ...styles.input,
          borderColor: PasswordError ? "red" : Colors.primary100,
          color: PasswordError ? "red" : Colors.primary100,
        }}
        placeholderColor={Colors.primary100}
        labelStyle={{ color: Colors.primary100 }}
      />
      <Button text="Sign In" callback={Submit} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 0.5,
    borderColor: Colors.primary200,
    marginTop: 5,
  },
  btn: {
    width: SCREEN_WIDTH * 0.5,
    marginTop: 20,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary600,
    borderWidth: 0.5,
    color: Colors.text,
    justifyContent: "center",
    borderRadius: radius.medium,
  },
});
