import React from "react";
import AuthForm from "../../../modules/AuthForm/AuthForm";
import useAuth from "../../../hooks/useAuth";

export default function RegisterScreen() {
  const { onSubmit, error } = useAuth("register");
  return <AuthForm header="Register" onSubmit={onSubmit} error={error || ""} />;
}
