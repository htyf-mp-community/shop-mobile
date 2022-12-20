import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import schema from "./schema";
import type { UserInputProps } from "utils/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import PasswordToggle from "./components/PasswordToggle";
import { ValidatedInput, Button } from "@components/index";

import { AntDesign } from "@expo/vector-icons";
import layout from "constants/layout";
import PasswordStrength from "./components/PasswordStrength";

interface AuthFormProps {
  onSubmit: ({ email, password }: UserInputProps) => Promise<void> | void;
  header: "Login" | "Register";
  error: string;
  loading: boolean;

  initialValues?: {
    email?: string;
    password?: string;
  };
}

export default function AuthForm({
  onSubmit,
  header,
  error,
  loading,
  initialValues: initialValuesProp,
}: AuthFormProps) {
  const navigation = useNavigation<any>();
  const [vissible, setVissible] = useState(false);

  const loadingIcon = loading ? (
    <ActivityIndicator
      size={"small"}
      color="white"
      style={{ marginRight: 10 }}
    />
  ) : null;

  const isRegister = header === "Register";

  const initialValues = {
    email: initialValuesProp?.email || "",
    password: initialValuesProp?.password || "",
    ...(header === "Register" && { confirmPassword: "" }),
  };

  const inputStyle = [
    styles.input,
    { width: layout.screen.width - 20, paddingVertical: 10 },
  ];

  return (
    <KeyboardAvoidingView style={[styles.form]}>
      <Formik
        enableReinitialize
        validationSchema={schema(isRegister)}
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validateOnChange
      >
        {(formik) => (
          <>
            <ValidatedInput
              autoFocus
              name="email"
              style={inputStyle}
              placeholder="Email*"
              //prettier-ignore
              leftIcon={<AntDesign name="user" size={20} color={
                !!formik.errors.email && formik.touched.email ? "#ff3030" : "white"
              } />}
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              clearButtonMode={"always"}
              {...formik}
            />
            <ValidatedInput
              name="password"
              style={inputStyle}
              placeholder="Password*"
              //prettier-ignore
              leftIcon={<AntDesign name="lock" size={20} color={
                !!formik.errors.password && formik.touched.password ? "#ff3030" : "white"
              } />}
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={!vissible}
              returnKeyType="done"
              clearButtonMode={"always"}
              rightIcon={
                <PasswordToggle
                  isError={!!formik.errors.password && formik.touched.password}
                  setVissible={setVissible}
                  vissible={vissible}
                />
              }
              {...formik}
            />

            {isRegister && (
              <ValidatedInput
                style={inputStyle}
                placeholder="Confirm Password*"
                //prettier-ignore
                leftIcon={<AntDesign name="lock" size={20} color={
                !!formik.errors.confirmPassword && formik.touched.confirmPassword ? "#ff3030" : "white"
              } />}
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={!vissible}
                rightIcon={
                  <PasswordToggle
                    isError={
                      !!formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                    }
                    setVissible={setVissible}
                    vissible={vissible}
                  />
                }
                name="confirmPassword"
                {...formik}
              />
            )}

            {isRegister && (
              <PasswordStrength password={formik.values.password} />
            )}

            <Button
              text={header.toUpperCase()}
              onPress={() => formik.handleSubmit()}
              style={[styles.btn]}
              icon={loadingIcon}
              type="contained"
              variant="primary"
              disabled={!(formik.isValid && formik.dirty && !loading && !error)}
              fontStyle={{ fontWeight: "bold" }}
              testID="SUBMIT_BUTTON"
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(!isRegister ? "Register" : "Login")
              }
              style={{
                marginTop: 10,
              }}
            >
              <Text style={{ color: "gray" }}>
                {!isRegister ? "Don't have account?" : "Have an account?"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
