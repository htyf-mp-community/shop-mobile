import { Colors } from "constants/styles";
import Ripple from "react-native-material-ripple";
import { ReactNode } from "react";

interface IconButtonProps {
  onPress: () => void;
  icon: ReactNode;
  disabled?: boolean;
  size?: 1 | 2 | 3 | 4 | 5;
}

const IconButton = ({ icon, onPress, disabled, size = 3 }: IconButtonProps) => {
  const sizes = [20, 24, 30, 34, 40];

  const buttonSize = sizes[size + 1];

  return (
    <Ripple
      disabled={disabled}
      rippleCentered
      rippleColor="white"
      onPress={onPress}
      style={{
        width: buttonSize,
        height: buttonSize,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
      }}
    >
      {icon}
    </Ripple>
  );
};

export default IconButton;
