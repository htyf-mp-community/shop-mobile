import { Dimensions, StyleSheet } from "react-native";
import { Fonts, Padding } from "@constants/styles";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width,
    padding: Padding.medium,
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    alignItems: "center",
    paddingVertical: 5,
  },
  between: {
    justifyContent: "space-between",
  },

  text: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 27,
    color: "#fff",
  },
  stars: {
    marginTop: 0,
    marginLeft: -5,
    width: 100,
    padding: 0,
    transform: [
      {
        scale: 0.4,
      },
    ],
  },
  button: {
    padding: Padding.medium,
  },
});

export default styles;
