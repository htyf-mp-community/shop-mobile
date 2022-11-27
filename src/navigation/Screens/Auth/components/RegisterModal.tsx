import { Button, Modal } from "components";
import { Fonts } from "constants/styles";
import { Dimensions, Text } from "react-native";

interface Props {
  isVisible: boolean;
  onCloseModal: () => void;
  error: string | null;

  onSignInPress: () => void;
}

const { height, width } = Dimensions.get("screen");

export default function RegisterModal({
  isVisible,
  onCloseModal,
  error,
  onSignInPress,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      animationIn="zoomIn"
      animationOut="zoomOutUp"
      deviceHeight={height}
      onBackButtonPress={onCloseModal}
      statusBarTranslucent
      useNativeDriverForBackdrop
      style={{ alignItems: "center", paddingVertical: 20 }}
    >
      <Text
        style={{ color: "#fff", fontFamily: Fonts.PoppinsBold, fontSize: 25 }}
      >
        {error || "Activate your account"}
      </Text>

      <Text
        style={{
          color: "#fff",
          fontFamily: Fonts.PoppinsRegular,
          fontSize: 18,
          marginTop: 10,
        }}
      >
        {error || "Please check your email and activate your account"}
      </Text>

      <Button
        style={{ width: width - 100, marginTop: 20 }}
        variant="primary"
        text="SIGN IN"
        callback={() => onSignInPress()}
      />
    </Modal>
  );
}
