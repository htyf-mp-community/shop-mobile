import { Modal } from "../../../../components";
import { View, Text, Switch, Dimensions } from "react-native";
import { Fonts } from "../../../../constants/styles";
import { EvilIcons } from "@expo/vector-icons";
import useColorTheme from "utils/context/ThemeContext";

interface NotificationsProps {
  isVisible: boolean;
  onHide: () => void;
  isEnabled: boolean;
  onToggle: () => void;
}

const { height } = Dimensions.get("screen");

export default function NotificationsModal({
  isVisible,
  onHide,
  isEnabled,
  onToggle,
}: NotificationsProps) {
  const { theme } = useColorTheme();
  return (
    <Modal
      deviceHeight={height}
      useNativeDriverForBackdrop
      onBackButtonPress={onHide}
      onBackdropPress={onHide}
      hideModalContentWhileAnimating
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut={"zoomOutUp"}
      statusBarTranslucent
      style={{ padding: 20, paddingVertical: 25, borderRadius: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <EvilIcons
          name="bell"
          size={30}
          style={{ marginRight: 5, marginBottom: 10 }}
          color="white"
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            fontFamily: Fonts.PoppinsBold,
          }}
        >
          Notifications
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Switch value={isEnabled} onChange={onToggle} />
        <Text style={{ color: theme.textFaded, fontSize: 18 }}>
          {isEnabled ? "enabled" : "disabled"}
        </Text>
      </View>
    </Modal>
  );
}
