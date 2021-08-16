import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#111111",
    width: WIDTH * 0.9,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    fontFamily: "sans-serif",
  },
  label: {
    width: WIDTH * 0.9,
    fontSize: 18,
    color: "black",
  },
});

export default styles;
