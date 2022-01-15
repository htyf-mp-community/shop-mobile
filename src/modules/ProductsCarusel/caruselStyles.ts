import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const caruselStyles = StyleSheet.create({
  nothing: {
    backgroundColor: Colors.primary,
    height: HEIGHT / 3,
    width: WIDTH * 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 35,
    paddingLeft: 10,
  },
  container: {
    width: WIDTH,
  },
});

export default caruselStyles;
