import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  heading: {
    fontSize: 35,
    fontFamily: "PoppinsMedium",
  },
  block: {
    width: "100%",
    marginTop: 15,
  },
  blockLabel: {
    color: "#DEDEDE",
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  blockText: {
    color: "white",
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  },
  blockRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
