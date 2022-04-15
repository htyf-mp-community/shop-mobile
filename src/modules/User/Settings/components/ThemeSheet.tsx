import {
  Image,
  Modal,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import SettingButton from "./SettingButton";
import useColorTheme from "utils/context/ThemeContext";
import useBoolean from "utils/hooks/useBoolean";
import { Colors } from "constants/styles";
import Ripple from "react-native-material-ripple";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  modal: {
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  inner: {
    position: "absolute",
    bottom: 0,
    width,
    height: 500,
    backgroundColor: Colors.primary100,
    zIndex: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    marginTop: 10,
    width: width / 2 - 10,
    height: 400,
    borderWidth: 3,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default function ThemeSheet() {
  const { current, onSwitchTheme } = useColorTheme();
  const { state, toggle } = useBoolean();

  return (
    <>
      <SettingButton
        onPress={toggle}
        fadedText={current}
        iconExpanded={state}
        primaryText="Theme"
      />
      <Modal visible={state} animationType="fade" transparent>
        <Pressable style={styles.modal} onPress={toggle}>
          <Pressable style={styles.inner}>
            <Ripple onPress={() => onSwitchTheme("dark")}>
              <Image
                resizeMode="cover"
                style={[
                  styles.image,
                  {
                    borderColor:
                      current === "dark" ? Colors.secondary : undefined,
                  },
                ]}
                source={require("../../../../../preview/home.jpg")}
              />
              <Text style={styles.text}>Dark</Text>
            </Ripple>
            <Ripple onPress={() => onSwitchTheme("light")}>
              <Image
                resizeMode="cover"
                style={[
                  styles.image,
                  {
                    borderColor:
                      current === "light" ? Colors.secondary : undefined,
                  },
                ]}
                source={require("../../../../../preview/home.jpg")}
              />
              <Text style={styles.text}>Light</Text>
            </Ripple>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
