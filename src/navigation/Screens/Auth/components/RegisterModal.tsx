import { Button, Modal } from "components";
import layout from "constants/layout";
import { Fonts } from "constants/styles";
import { Dimensions, Text } from "react-native";

interface Props {
  isVisible: boolean;
  onCloseModal: () => void;
  error: string | null;

  onSignInPress: () => void;
}

export default function RegisterModal({
  isVisible,
  onCloseModal,
  error,
  onSignInPress,
}: Props) {
  const isError = !!error;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      deviceHeight={layout.screen.height}
      onBackButtonPress={onCloseModal}
      statusBarTranslucent
      useNativeDriverForBackdrop
      style={{ padding: 15, borderRadius: 20 }}
    >
      <Text
        style={{ color: "#fff", fontFamily: Fonts.PoppinsBold, fontSize: 22.5 }}
      >
        {isError ? "Oh no! Something went wrong" : "Success!"}
      </Text>

      <Text style={{ color: "#fff", fontSize: 18, marginVertical: 20 }}>
        {isError
          ? error
          : "You have successfully registered! Activate your account by clicking the link sent to your email."}
      </Text>

      <Button
        style={{ width: "100%", marginTop: 15 }}
        variant="primary"
        text={isError ? "Try again" : "Sign in"}
        type="contained"
        callback={() => onSignInPress()}
      />
    </Modal>
  );
}
