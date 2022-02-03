import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: WIDTH * 0.9,
    padding: 15,
    fontSize: 18,
    borderRadius: 5,
    fontFamily: "PoppinsRegular",
    backgroundColor: Colors.primary100,
    color: "#fff",
  },
  label: {
    width: WIDTH * 0.9,
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
