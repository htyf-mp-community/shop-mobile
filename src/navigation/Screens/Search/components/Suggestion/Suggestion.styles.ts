import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: width,
    marginBottom: 30,
    alignItems: "center",
  },
  image: { borderRadius: 10 },

  textContainer: {
    flexDirection: "column",
    width: width - 40,
    marginTop: 5,
  },
  price: {
    color: "#DADDE2",
    fontSize: 20,
    marginTop: 5,
    fontFamily: "PoppinsRegular",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },
});
