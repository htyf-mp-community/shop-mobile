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
    width: 150,
    height: 100,
    borderRadius: 5,
  },
  input: {
    color: "white",
  },
  button: {
    width: width - 20,
    marginTop: 10,
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
  },
});
