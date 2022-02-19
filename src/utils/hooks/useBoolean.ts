import { useState } from "react";

export default function useBoolean(defaultValue: boolean = false) {
  const [state, setState] = useState(defaultValue);

  function toggle() {
    setState((p) => !p);
  }
  function negative() {
    setState(false);
  }
  function positive() {
    setState(true);
  }

  return { state, toggle, negative, positive };
}
