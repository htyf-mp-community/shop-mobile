import React, { useLayoutEffect } from "react";
import AuthForm from "@modules/AuthForm/AuthForm";
import useAuth from "@utils/hooks/useAuth";
import { Container } from "@components/index";
import RegisterModal from "../components/RegisterModal";
import { ScreenNavigationProps } from "/@types/types";

export default function RegisterScreen({
  navigation,
}: ScreenNavigationProps<"Register">) {
  const [isVisible, setIsVisible] = React.useState(false);

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const { onRegister, error, onClear, loading } = useAuth("register", {
    onStart: () => setIsVisible(true),
  });

  function handleSubmit(input: { email: string; password: string }) {
    setCredentials(input);
    onRegister(input);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Welcome stranger",
      headerTitleAlign: "center",
    });
  }, []);

  return (
    <Container centerVertical>
      <AuthForm
        loading={loading}
        error={error || ""}
        header="Register"
        onSubmit={handleSubmit}
      />
      <RegisterModal
        onSignInPress={() => {
          navigation.navigate("Login", {
            ...credentials,
          });
        }}
        error={error}
        isVisible={isVisible}
        onCloseModal={() => {
          setIsVisible(false);
          onClear();
        }}
      />
    </Container>
  );
}
