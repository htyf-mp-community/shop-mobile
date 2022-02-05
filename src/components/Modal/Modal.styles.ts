import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  modalContainer: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  modal: {
    width,
    height: height * 0.7,
    backgroundColor: "#131d33",
    position: "absolute",
    bottom: 0,
    zIndex: 15,
  },
  overlay: {
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
});

export default styles;
