import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: width,
    marginBottom: 50,
    marginTop: 10,
    alignItems: "center",
  },
  image: { width: width - 40, height: 250, borderRadius: 5 },

  textContainer: {
    flexDirection: "column",
    width: width - 40,
    marginTop: 5,
  },
  price: {
    color: "#DADDE2",
    fontSize: 20,
    fontFamily: "PoppinsRegular",
    paddingTop: 10,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "PoppinsBold",
    marginTop: 5,
  },
});
