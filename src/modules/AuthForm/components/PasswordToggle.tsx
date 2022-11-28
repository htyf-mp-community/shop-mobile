import { Entypo } from "@expo/vector-icons";
import { IconSize } from "@constants/styles";
import Ripple from "react-native-material-ripple";

interface PasswordToggleProps {
  setVissible: (arg: any) => void;
  vissible: boolean;

  isError?: boolean;
}

export default function PasswordToggle({
  setVissible,
  vissible,
  isError = false,
}: PasswordToggleProps) {
  return (
    <Ripple
      style={{ paddingHorizontal: 5 }}
      rippleCentered
      onPress={() => setVissible((p: boolean) => !p)}
    >
      {!vissible ? (
        <Entypo
          name="eye"
          size={IconSize.small}
          color={isError ? "#ff3030" : "white"}
        />
      ) : (
        <Entypo
          name="eye-with-line"
          size={IconSize.small}
          color={isError ? "#ff3030" : "white"}
        />
      )}
    </Ripple>
  );
}
