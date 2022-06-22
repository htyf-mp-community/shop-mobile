import React from "react";
import AuthForm from "@modules/AuthForm/AuthForm";
import useAuth from "@utils/hooks/useAuth";
import { Container } from "@components/index";
import RegisterModal from "../components/Modal";

export default function RegisterScreen() {
  const [isVisible, setIsVisible] = React.useState(false);

  const { onRegister, error, onClear, loading } = useAuth("register", {
    onStart: () => setIsVisible(true),
  });

  return (
    <Container centerVertical>
      <AuthForm
        loading={loading}
        error={error || ""}
        header="Register"
        onSubmit={onRegister}
      />
      <RegisterModal
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
