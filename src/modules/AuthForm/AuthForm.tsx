import { Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Text, TextInput } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { Colors, h1 } from "../../constants/styles";
import styles from "./styles";
import schema from "./schema";

interface AuthFormProps {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  header: "Login" | "Register";
  error?: string;
}

export default function AuthForm({ onSubmit, header, error }: AuthFormProps) {
  const initRef = useRef<null | TextInput>(null);

  useEffect(() => {
    initRef.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView style={[styles.form]}>
      {typeof error !== "undefined" && error !== "" && (
        <Text style={[h1, { fontWeight: "bold" }]}>{error}</Text>
      )}
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
          dirty,
        }) => (
          <>
            <Input
              inputRef={initRef}
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Email*"
              style={{
                ...styles.input,
                borderColor: errors.email ? "#FF3030" : Colors.primary100,
              }}
              placeholderTextColor={errors.email ? "#FF3030" : "#fff"}
              keyboardType="email-address"
              helperText={errors.email || "6-60 characters*"}
              helperStyle={{
                color: errors.email ? "#FF3030" : "#fff",
              }}
              onBlur={handleBlur("email")}
            />
            <Input
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Password*"
              style={{
                ...styles.input,
                borderColor: errors.password ? "#FF3030" : Colors.primary100,
              }}
              placeholderTextColor={errors.password ? "#FF3030" : "#fff"}
              helperText={errors.password || "6-60 characters*"}
              helperStyle={{ color: errors.password ? "#FF3030" : "#fff" }}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            <Button
              text={header.toUpperCase()}
              callback={handleSubmit}
              style={[styles.btn]}
              variant={isValid && dirty ? "primary" : "disabled"}
              disabled={!(isValid && dirty)}
              fontStyle={{ fontWeight: "bold" }}
              testID="SUBMIT_BUTTON"
            />
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
