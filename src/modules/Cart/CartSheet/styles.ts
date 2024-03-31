import { Fonts } from "constants/styles";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  navigation_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 27,
    fontFamily: Fonts.PoppinsBold,
  },
  preview_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 5,
  },
  text_column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  product_title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
  },
});
