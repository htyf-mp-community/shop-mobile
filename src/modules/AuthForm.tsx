import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { Colors, h2 } from "../constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type AuthFormProps = {
  onSubmit: (...props: any) => void;
};

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.form}>
      <Text style={h2}>Login</Text>
      <Input
        value={email}
        setValue={setEmail}
        name="e-mail"
        keyboardType="email-address"
        placeholder="email"
        style={styles.input}
        placeholderColor={Colors.primary200}
        labelStyle={{ color: Colors.primary200 }}
      />
      <Input
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="password"
        style={styles.input}
        placeholderColor={Colors.primary200}
        labelStyle={{ color: Colors.primary200 }}
      />
      <Button text="Submit" callback={onSubmit} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
    alignItems: "center",
  },
  input: {
    borderWidth: 0.5,
    borderColor: Colors.primary200,
    marginTop: 5,
  },
  btn: {
    width: SCREEN_WIDTH * 0.9,
    marginTop: 50,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary600,
    borderWidth: 0.5,
    color: "#fff",
  },
});
