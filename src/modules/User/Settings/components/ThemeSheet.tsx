import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import SettingButton from "./SettingButton";
import useColorTheme from "utils/context/ThemeContext";
import useBoolean from "utils/hooks/useBoolean";
import { Colors, Fonts } from "constants/styles";
import Ripple from "react-native-material-ripple";
import { Modal, Row } from "components";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  inner: {
    flexDirection: "column",
  },
  heading: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 25,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 300,
  },
  tip: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 20,
    textAlign: "center",
  },
});

export default function ThemeSheet() {
  const { current, onSwitchTheme, theme } = useColorTheme();
  const { state, toggle } = useBoolean();

  return (
    <>
      <SettingButton
        onPress={toggle}
        fadedText={current}
        iconExpanded={state}
        primaryText="Theme"
      />
      <Modal
        deviceHeight={height}
        useNativeDriverForBackdrop
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
        hideModalContentWhileAnimating
        isVisible={state}
        animationIn="zoomIn"
        animationOut={"zoomOutUp"}
        statusBarTranslucent
        style={{ padding: 20, paddingVertical: 25, borderRadius: 20 }}
      >
        <View style={styles.inner}>
          <Text style={[styles.heading, { color: theme.text }]}>
            Theme settings
          </Text>

          <Text
            style={{ color: "#fff", marginBottom: 15, textAlign: "center" }}
          >
            Functionality currently disabled
          </Text>

          <Row justifyContent="space-between">
            <Ripple
            //   onPress={() => onSwitchTheme("dark")}
            >
              <Text style={[styles.tip, { color: theme.text }]}>Dark</Text>
              <Image
                style={styles.image}
                source={require("../../../../../preview/home.jpg")}
              />
            </Ripple>
            <Ripple
            //   onPress={() => onSwitchTheme("light")}
            >
              <Text style={[styles.tip, { color: theme.text }]}>Light</Text>
              <Image
                style={styles.image}
                source={require("../../../../../preview/home.jpg")}
              />
            </Ripple>
          </Row>
        </View>
      </Modal>
    </>
  );
}
