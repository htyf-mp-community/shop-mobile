import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    height: height * 0.9,
  },
  buttonContainer: {
    width,
    padding: 10,
    backgroundColor: Colors.primary,
    height: height * 0.1,
  },
  button: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

export default styles;
