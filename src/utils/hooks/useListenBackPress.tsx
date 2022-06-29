import { BackHandler, Alert } from "react-native";
import { useEffect } from "react";

export default function useListenBackPress(
  onLeave: () => boolean | null | undefined,
  deps: any[] = []
) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onLeave
    );

    return () => backHandler.remove();
  }, deps);
}
