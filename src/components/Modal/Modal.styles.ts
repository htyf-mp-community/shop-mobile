import { Colors } from "constants/styles";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    left: 0,
    position: "absolute",
  },
  inner: {
    width: width - 40,
    padding: 10,

    backgroundColor: Colors.primary100,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default styles;
