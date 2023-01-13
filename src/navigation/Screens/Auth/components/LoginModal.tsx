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
      style={{
        alignItems: "center",
        height: layout.screen.height / 2,
        padding: 20,
      }}
    >
      <View style={{ alignItems: "center", flex: 3 }}>
        <Image
          source={require("@assets/4944051.png")}
          style={{ height: 100, width: 100 }}
        />

        <Text
          style={{
            color: "#fff",
            fontFamily: Fonts.PoppinsBold,
            fontSize: 30,
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
          Something went wrong, see message below:{"\n"}
          <Text style={{ fontWeight: "bold" }}>{error}</Text>
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          callback={clear}
          text="Try again"
          type="contained"
          color="primary"
          size="xl"
          borderRadius="full"
          style={{ width: layout.window.width - 80 }}
        />
      </View>
    </Modal>
  );
}
