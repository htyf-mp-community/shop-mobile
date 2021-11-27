import React from "react";

import AuthForm from "../../../modules/AuthForm/AuthForm";
import useAuth from "../../../hooks/useAuth";

export default function LoginScreen() {
  const { onSubmit, error } = useAuth("login");
  return <AuthForm onSubmit={onSubmit} header="Login" error={error || ""} />;
}
