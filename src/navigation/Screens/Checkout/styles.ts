import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  modal: {
    padding: 20,
    borderRadius: 10,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsBold,
    color: "#fff",
    marginBottom: 15,
  },
  center: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 25,
    fontFamily: Fonts.PoppinsBold,
    color: "red",
    marginBottom: 15,
  },
  success: {
    fontSize: 25,
    fontFamily: Fonts.PoppinsBold,
    color: Colors.secondary,
  },
});

export default styles;
