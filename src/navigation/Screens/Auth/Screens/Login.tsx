import React from "react";
import AuthForm from "@modules/AuthForm/AuthForm";
import useAuth from "utils/hooks/useAuth";
import { ActivityIndicator } from "react-native";
import { Container } from "@components/index";
import useBoolean from "utils/hooks/useBoolean";
import RNModal from "react-native-modal";
import layout from "constants/layout";
import { ScreenNavigationProps } from "/@types/types";
import LoginModal from "../components/LoginModal";

export default function LoginScreen({ route }: ScreenNavigationProps<"Login">) {
  const { onLogin, error, loading, onClear } = useAuth("login", {
    onFailed: () => {
      toggle();
    },
  });

  const { state: isVisible, toggle } = useBoolean();

  function clear() {
    onClear();
    toggle();
  }

  return (
    <Container centerVertical>
      <AuthForm
        initialValues={route.params!}
        onSubmit={onLogin}
        header="Login"
        loading={loading}
        error={error || ""}
      />

      <RNModal
        isVisible={loading}
        deviceHeight={layout.screen.height}
        statusBarTranslucent
        useNativeDriverForBackdrop
        animationIn={"fadeIn"}
      >
        <ActivityIndicator size={"large"} color="#fff" />
      </RNModal>

      <LoginModal visible={isVisible} clear={clear} error={""} />
    </Container>
  );
}
