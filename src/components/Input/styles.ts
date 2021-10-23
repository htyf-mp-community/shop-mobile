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
    fontSize: 15,
    borderRadius: 5,
    fontFamily: "PoppinsRegular",
  },
  label: {
    width: WIDTH * 0.9,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
