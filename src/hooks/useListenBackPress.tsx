import { BackHandler, Alert } from "react-native";
import { useEffect } from "react";

export default function useListenBackPress(onLeave: () => undefined) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onLeave
    );

    return () => backHandler.remove();
  }, []);
}
