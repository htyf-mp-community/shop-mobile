import Button from "components/ui/Button/Button";
import { View, ViewProps } from "react-native";

import Animated, { FadeIn, FadeOut, withTiming } from "react-native-reanimated";

interface MenuProps extends ViewProps {
  /**
   * elements inside main container */
  children: React.ReactNode;

  /**
   * if true, menu will be visible */
  isOpen: boolean;

  /**
   * runs on menu close */
  onClose: () => void;

  onOpen: () => void;

  onToggle: () => void;

  placement: "top" | "bottom" | "left" | "right" | "relative" | "center";

  closeOnSelect: boolean;

  closeOnBlur: boolean;
}

function menuPosition({ placement }: Pick<MenuProps, "placement">) {
  return {
    ...(placement === "top" && { top: 5, right: 5 }),
    ...(placement === "bottom" && { bottom: 5, right: 5 }),
    ...(placement === "left" && { left: 5, top: 5 }),
    ...(placement === "right" && { right: 5, top: 5 }),
    //  ...(placement === "relative" && { top: 5, right: 5 }),
    //  ...(placement === "center" && { top: 5, right: 5 }),
  };
}

export default function Menu({
  children,
  closeOnBlur,
  closeOnSelect,
  isOpen,
  onClose,
  onOpen,
  onToggle,
  placement,
  ...rest
}: MenuProps) {
  return isOpen ? (
    <Animated.View
      style={{
        position: "absolute",
        ...menuPosition({ placement }),
        padding: 5,
        backgroundColor: "red",
        width: 150,
        height: "auto",
        zIndex: 1000,
        borderRadius: 5,
      }}
    >
      <Button text="Option 1" onPress={() => {}} />
      <Button text="Option 1" onPress={() => {}} />
      <Button text="Option 1" onPress={() => {}} />
    </Animated.View>
  ) : null;
}

Menu.Option = () => {
  return <View></View>;
};
