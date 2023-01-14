import { ActivityIndicator } from "react-native";
import ReactNativeModal from "react-native-modal";
import layout from "constants/layout";
import { Colors } from "constants/styles";

export default function ModalLoader({ isVisible }: { isVisible: boolean }) {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      deviceHeight={layout.screen.height}
    >
      <ActivityIndicator color={Colors.secondary} size={50} />
    </ReactNativeModal>
  );
}
