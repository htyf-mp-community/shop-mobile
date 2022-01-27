import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: width - 20,
    height: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 25,
  },
  innerAddressModal: {
    position: "absolute",
    width,
    height: height * 0.9,
    bottom: 0,
    borderTopWidth: 2,
    borderColor: Colors.primary100,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    marginTop: 10,
    width: width - 20,
    height: 250,
  },
});
