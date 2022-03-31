import { Dimensions, StyleSheet } from "react-native";
import { Colors, radius, Padding } from "@constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    marginTop: 5,
    textDecorationLine: "none",
  },
  btn: {
    width: SCREEN_WIDTH - 40,
    marginTop: 5,
    padding: 15,
    color: Colors.text,
    justifyContent: "center",
    borderRadius: radius.small,
  },
  toggle: {
    position: "absolute",
    right: 2,
    top: 2,
    backgroundColor: Colors.primary100,
    height: 55,
    padding: Padding.small,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
