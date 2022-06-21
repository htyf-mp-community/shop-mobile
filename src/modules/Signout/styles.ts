import { Fonts } from "constants/styles";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  heading: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 25,
    marginBottom: 5,
  },
  modal: {
    padding: 20,
    borderRadius: 20,
    paddingVertical: 20,
  },
  icon: {
    marginBottom: 20,
  },
  subText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
});
