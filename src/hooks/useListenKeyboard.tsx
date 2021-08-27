import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const variants = { open: "open", closed: "closed" };

export default function useListenKeyboard() {
  const [status, setStatus] = useState(variants.closed);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setStatus(variants.open);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setStatus(variants.closed);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { status, variants };
}
