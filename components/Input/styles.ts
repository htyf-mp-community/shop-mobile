import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: WIDTH * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#111111",
    borderWidth: 0.5,
    fontSize: 18,
    fontFamily: "sans-serif",
  },
  label: {
    fontSize: 18,
    color: "black",
  },
});

export default styles;
