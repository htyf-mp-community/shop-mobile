import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  modal: {
    width: width - 30,
    height: 275,
    position: "absolute",
    zIndex: 10,
    top: 10,
    padding: 5,
    borderRadius: 5,
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 35,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    paddingTop: 10,
  },
  subText: {
    fontSize: 20,
    padding: 15,
    textAlign: "center",
  },
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: "center",
  },
});
