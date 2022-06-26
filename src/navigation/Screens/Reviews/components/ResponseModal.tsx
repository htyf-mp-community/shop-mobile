import { Button, Modal } from "components";
import { Fonts } from "constants/styles";
import { Dimensions, Text } from "react-native";
import type { State } from "../hooks/useUploadReview";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

interface Props {
  isVisible: boolean;
  onCloseModal: () => void;
  onSuccess: () => void;

  state: Partial<State>;
}

const Icon = ({ error }: { error: boolean }) =>
  error ? (
    <MaterialIcons name="error-outline" size={35} color="white" />
  ) : (
    <MaterialIcons name="check" size={35} color="white" />
  );

export default function ResponseModal({
  isVisible,
  onCloseModal,
  onSuccess,
  state,
}: Props) {
  const hasError = !!state?.error;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOutUp"
      useNativeDriverForBackdrop
      onBackdropPress={onCloseModal}
      hideModalContentWhileAnimating
      deviceHeight={height}
      statusBarTranslucent
      style={{ padding: 20 }}
    >
      <Icon error={!!state?.error} />
      <Text
        style={{
          color: "#fff",
          fontSize: 35,
          marginTop: 15,
          fontFamily: Fonts.PoppinsBold,
        }}
      >
        {!!state?.error ? "Oooops" : "Yaas"}
      </Text>

      <Text
        style={{
          fontFamily: Fonts.PoppinsRegular,
          color: "#fff",
          fontSize: 18,
        }}
      >
        {state?.message || state?.error || "Thank you for your contribution"}
      </Text>

      <Button
        size="xl"
        callback={() => (hasError ? onCloseModal() : onSuccess())}
        style={{ marginTop: 20 }}
        text={hasError ? "Ooops, try again" : "OK"}
        variant="primary"
      />
    </Modal>
  );
}
