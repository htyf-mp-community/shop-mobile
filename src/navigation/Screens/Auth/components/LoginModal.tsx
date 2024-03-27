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
      animationOut="zoomOutUp"
      onBackButtonPress={clear}
      statusBarTranslucent
      useNativeDriverForBackdrop
      style={{
        alignItems: "center",
        height: 350,
        padding: 20,
        borderRadius: 20,
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
          OHH...
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontFamily: Fonts.PoppinsRegular,
            lineHeight: 35,
          }}
        >
          Something went wrong:
          {"\n"}
          <Text
            style={{ fontWeight: "bold", color: Colors.error, fontSize: 20 }}
          >
            {error}
          </Text>
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
