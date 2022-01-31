import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  img: {
    width,
    height: 200,
  },
  input: {
    color: "white",
  },
  button: {
    width: width * 0.9,
    marginTop: 20,
    justifyContent: "center",
    padding: 15,
  },
});
