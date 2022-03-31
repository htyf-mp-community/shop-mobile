import styles from "../styles";
import { Entypo } from "@expo/vector-icons";
import { IconSize } from "@constants/styles";
import Ripple from "react-native-material-ripple";

interface PasswordToggleProps {
  setVissible: (arg: any) => void;
  vissible: boolean;
}

export default function PasswordToggle({
  setVissible,
  vissible,
}: PasswordToggleProps) {
  return (
    <Ripple
      rippleCentered
      onPress={() => setVissible((p: boolean) => !p)}
      style={[styles.toggle]}
    >
      {!vissible ? (
        <Entypo name="eye" size={IconSize.small} color="white" />
      ) : (
        <Entypo name="eye-with-line" size={IconSize.small} color="white" />
      )}
    </Ripple>
  );
}
