import { useState } from "react";

export const ERROR_CODES = {};

export default function useError() {
  const [error, setError] = useState("");

  function clearError() {
    setError("");
  }

  function handleError(input: unknown) {}

  return { error, clearError, handleError };
}
