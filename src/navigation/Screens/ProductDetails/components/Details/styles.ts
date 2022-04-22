import { Dimensions, StyleSheet } from "react-native";
import { Colors, Padding } from "@constants/styles";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width,
    padding: Padding.medium,
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.primary200,
    marginBottom: 5,
    alignItems: "center",
    paddingVertical: 5,
  },
  between: {
    justifyContent: "space-between",
  },

  text: {
    fontFamily: "PoppinsBold",
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
