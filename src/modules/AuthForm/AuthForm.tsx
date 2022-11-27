import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import styles from "./styles";
import schema from "./schema";
import type { UserInputProps } from "utils/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import PasswordToggle from "./components/PasswordToggle";

import { AntDesign } from "@expo/vector-icons";

interface AuthFormProps {
  onSubmit: ({ email, password }: UserInputProps) => Promise<void>;
  header: "Login" | "Register";
  error: string;
  loading: boolean;
}

export default function AuthForm({
  onSubmit,
  header,
  error,
  loading,
}: AuthFormProps) {
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
              leftIcon={<AntDesign name="user" size={20} color="white" />}
              autoFocus
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Email*"
              style={[styles.input, { width: width - 40, paddingVertical: 10 }]}
              error={!!errors.email && touched.email}
              autoComplete="email"
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
                leftIcon={<AntDesign name="lock" size={20} color="white" />}
                value={values.password}
                autoCorrect={false}
                onChangeText={handleChange("password")}
                placeholder="Password*"
                style={[
                  styles.input,
                  { width: width - 40, paddingVertical: 10 },
                ]}
                error={!!errors.password && touched.password}
                helperText={
                  !!errors.password && touched.password
                    ? errors.password
                    : "6-60 characters*"
                }
                onBlur={handleBlur("password")}
                secureTextEntry={!vissible}
                rightIcon={
                  <PasswordToggle
                    setVissible={setVissible}
                    vissible={vissible}
                  />
                }
              />
            </View>

            <Button
              text={header.toUpperCase()}
              onPress={() => handleSubmit()}
              style={[styles.btn]}
              icon={
                loading ? (
                  <ActivityIndicator
                    size={"small"}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                ) : null
              }
              type="contained"
              variant="primary"
              disabled={!(isValid && dirty && !loading && !error)}
              fontStyle={{ fontWeight: "bold" }}
              testID="SUBMIT_BUTTON"
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(header === "Login" ? "Register" : "Login")
              }
              style={{
                marginTop: 10,
              }}
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
