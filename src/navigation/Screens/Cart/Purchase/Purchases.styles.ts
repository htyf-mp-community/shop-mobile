import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderTopWidth: 1,
  },
  content: {
    width: width * 0.9,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontFamily: "PoppinsRegular",
  },
  button: {
    width: width * 0.95,
    justifyContent: "center",
    padding: 15,
    marginTop: 10,
  },
});
