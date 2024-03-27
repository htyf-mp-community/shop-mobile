import { Modal, Button } from "components";
import { Image, Text, View } from "react-native";
import { Colors, Fonts } from "constants/styles";
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
      animationOut="zoomOut"
      deviceHeight={layout.screen.height}
      onBackButtonPress={clear}
      statusBarTranslucent
      useNativeDriverForBackdrop
      style={{ padding: 15, borderRadius: 20 }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: Fonts.PoppinsBold,
          fontSize: 30,
        }}
      >
        OHH...
      </Text>

      <Text style={{ color: "#fff", fontSize: 18 }}>{error}</Text>

      <Button
        callback={clear}
        style={{ width: "100%", marginTop: 15 }}
        variant="primary"
        text="Try again"
        type="contained"
      />
    </Modal>
  );
}
