import { Modal, Button } from "components";
import { Image, Text, View } from "react-native";
import { Fonts } from "constants/styles";
import layout from "constants/layout";

interface LoginModalProps {
  visible: boolean;
  clear: () => void;
  error: string;
}

export default function LoginModal({ clear, error, visible }: LoginModalProps) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={clear}
      animationIn="zoomIn"
      animationOut="zoomOutUp"
      onBackButtonPress={clear}
      statusBarTranslucent
      useNativeDriverForBackdrop
      style={{ alignItems: "center", paddingVertical: 20, borderRadius: 40 }}
    >
      <Image
        source={require("@assets/4944051.png")}
        style={{ height: 100, width: 100 }}
      />

      <Text
        style={{
          color: "#fff",
          fontFamily: Fonts.PoppinsBold,
          fontSize: 30,
          marginTop: 10,
        }}
      >
        Ooops...
      </Text>

      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontFamily: Fonts.PoppinsRegular,
          lineHeight: 35,
        }}
      >
        Invalid email or password
      </Text>
      <Button
        callback={clear}
        text="Try again"
        variant="primary"
        size="xl"
        borderRadius="full"
        style={{ marginTop: 30, width: layout.window.width - 40 - 40 }}
      />
    </Modal>
  );
}
