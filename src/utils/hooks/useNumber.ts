import { useState } from "react";

export default function useNumber(
  defaultValue = 0,
  { min, max }: { min: number; max: number }
) {
  const [state, setState] = useState(defaultValue);

  function increment() {
    setState((s) => {
      if (s + 1 > max) {
        return s;
      }
      return s + 1;
    });
  }

  function decrement() {
    setState((s) => {
      if (s - 1 < min) {
        return s;
      }
      return s - 1;
    });
  }

  function own(value: number) {
    setState(value);
  }

  function clear() {
    setState(defaultValue);
  }

  return { number: state, increment, decrement, clear, own };
}
