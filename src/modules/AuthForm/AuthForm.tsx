import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import styles from "./styles";
import schema from "./schema";
import type { UserInputProps } from "utils/hooks/useAuth";

interface AuthFormProps {
  onSubmit: ({ email, password }: UserInputProps) => void;
  header: "Login" | "Register";
}

export default function AuthForm({ onSubmit, header }: AuthFormProps) {
  return (
    <KeyboardAvoidingView style={[styles.form]}>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onSubmit(values)}
        validateOnChange
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
              autoFocus
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Email*"
              style={styles.input}
              error={!!errors.email}
              placeholderTextColor={errors.email ? "#FF3030" : "#fff"}
              keyboardType="email-address"
              helperText={errors.email || "6-60 characters*"}
              onBlur={handleBlur("email")}
              clearButtonMode={"always"}
            />
            <Input
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Password*"
              style={styles.input}
              error={!!errors.password}
              placeholderTextColor={errors.password ? "#FF3030" : "#fff"}
              helperText={errors.password || "6-60 characters*"}
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
