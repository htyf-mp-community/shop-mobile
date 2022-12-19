import { ReactNode } from "react";

import RNModal, { ModalProps } from "react-native-modal";
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import { radius } from "constants/styles";

interface IModalProps extends Partial<ModalProps> {
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: radius.small,
  },
});

const { height } = Dimensions.get("screen");

export default function Modal({
  children,
  isVisible,
  style,
  ...rest
}: IModalProps) {
  const { theme } = useColorTheme();
  const { width } = useWindowDimensions();

  const backgroundColor = theme.primary;

  return (
    <RNModal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOutUp"
      deviceHeight={height}
      statusBarTranslucent
      useNativeDriverForBackdrop
      style={{ alignItems: "center", paddingVertical: 20 }}
      {...rest}
    >
      <View
        style={[
          styles.container,
          { backgroundColor, width: width - 40 },
          style,
        ]}
      >
        {children}
      </View>
    </RNModal>
  );
}
