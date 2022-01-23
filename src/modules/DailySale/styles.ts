import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH } = Dimensions.get("window");

const dailyStyle = StyleSheet.create({
  container: {
    width: WIDTH,
    minHeight: 375,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 30,
    color: Colors.text,
    padding: 10,
  },
  image: {
    width: WIDTH - 20,
    height: 250,
    borderRadius: 5,
  },
  button: {
    width: 130,
    flexDirection: "row-reverse",
  },
  buttonsContainer: {
    position: "absolute",
    width: WIDTH - 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary100,
    flexDirection: "row",
    bottom: -40,
    justifyContent: "space-around",
    alignItems: "center",
  },
  price: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "PoppinsBold",
  },
});

export default dailyStyle;
