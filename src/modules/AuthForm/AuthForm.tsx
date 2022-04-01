import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import styles from "./styles";
import schema from "./schema";
import type { UserInputProps } from "utils/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import PasswordToggle from "./components/PasswordToggle";

interface AuthFormProps {
  onSubmit: ({ email, password }: UserInputProps) => void;
  header: "Login" | "Register";
}

export default function AuthForm({ onSubmit, header }: AuthFormProps) {
  const navigation = useNavigation<any>();
  const [vissible, setVissible] = useState(false);
  const { width } = useWindowDimensions();

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
          touched,
        }) => (
          <>
            <Input
              autoFocus
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Email*"
              style={[styles.input, { width: width - 40 }]}
              error={!!errors.email && touched.email}
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              helperText={
                !!errors.email && touched.email
                  ? errors.email
                  : "6-60 characters*"
              }
              onBlur={handleBlur("email")}
              clearButtonMode={"always"}
            />
            <View style={{ flexDirection: "row", position: "relative" }}>
              <Input
                value={values.password}
                autoCorrect={false}
                onChangeText={handleChange("password")}
                placeholder="Password*"
                style={[styles.input]}
                error={!!errors.password && touched.password}
                helperText={
                  !!errors.password && touched.password
                    ? errors.password
                    : "6-60 characters*"
                }
                onBlur={handleBlur("password")}
                secureTextEntry={!vissible}
              />
              <PasswordToggle setVissible={setVissible} vissible={vissible} />
            </View>
            <Button
              text={header.toUpperCase()}
              onPress={() => handleSubmit()}
              style={[styles.btn]}
              variant={isValid && dirty ? "primary" : "disabled"}
              disabled={!(isValid && dirty)}
              fontStyle={{ fontWeight: "bold" }}
              testID="SUBMIT_BUTTON"
            />
            <TouchableOpacity
              onPress={() =>
                navigation.replace("Auth", {
                  screen: header === "Login" ? "Register" : "Login",
                })
              }
              style={{ marginTop: 5 }}
            >
              <Text style={{ color: "gray" }}>
                {header === "Login"
                  ? "Don't have account?"
                  : "Have an account?"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
