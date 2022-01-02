import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Colors, h1, radius } from "../../constants/styles";
import useListenKeyboard from "../../hooks/useListenKeyboard";

import schema from "./schema";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type AuthFormProps = {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  header: string;
  error?: string;
};

export default function AuthForm({ onSubmit, header, error }: AuthFormProps) {
  const { status } = useListenKeyboard();

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={[styles.form, { paddingTop: status === "open" ? 10 : 100 }]}
    >
      <Text style={[h1, { fontWeight: "bold" }]}>{header}</Text>
      {error && <Text style={[h1, { fontWeight: "bold" }]}>{error}</Text>}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <Input
              value={values.email}
              onChangeText={handleChange("email")}
              name={errors.email ? errors.email : "Email"}
              placeholder="Email"
              style={{
                ...styles.input,
                borderColor: errors.email ? "#FF3030" : "#fff",
              }}
              labelStyle={{ color: errors.email ? "#FF3030" : "#fff" }}
              placeholderTextColor={errors.email ? "#FF3030" : "#fff"}
              keyboardType="email-address"
              helperText="6-60 characters"
              helperStyle={{ color: errors.email ? "#FF3030" : "#fff" }}
              onBlur={handleBlur("email")}
            />
            <Input
              value={values.password}
              onChangeText={handleChange("password")}
              name={errors.password ? errors.password : "Email"}
              placeholder="password"
              style={{
                ...styles.input,
                borderColor: errors.password ? "#FF3030" : "#fff",
              }}
              labelStyle={{ color: errors.password ? "#FF3030" : "#fff" }}
              placeholderTextColor={errors.password ? "#FF3030" : "#fff"}
              helperText="6-60 characters"
              helperStyle={{ color: errors.password ? "#FF3030" : "#fff" }}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            <Button
              text={header.toUpperCase()}
              callback={handleSubmit}
              style={[
                styles.btn,
                { backgroundColor: isValid ? "#FF0056" : "#111111" },
              ]}
              disabled={!isValid}
              fontStyle={{ fontWeight: "bold" }}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  input: {
    borderWidth: 1,
    marginTop: 5,
    textDecorationLine: "none",
  },
  btn: {
    width: SCREEN_WIDTH * 0.45,
    marginTop: 5,
    padding: 15,
    color: Colors.text,
    justifyContent: "center",
    borderRadius: radius.medium,
  },
});
