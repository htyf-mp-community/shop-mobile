import { StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

const RADIUS = 10;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    padding: 20,
    backgroundColor: Colors.primary,
    fontFamily: "PoppinsMedium",
  },
  title: {
    fontSize: 25,
    padding: 10,
    paddingLeft: 15,
    fontFamily: "PoppinsBold",
    borderBottomWidth: 1,
    borderBottomColor: "#434655",
  },
  description: {
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#434655",
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    padding: 10,
    backgroundColor: Colors.primary100,
    borderRadius: RADIUS,
  },
  category: {
    color: "#fff",
    padding: 15,
    backgroundColor: Colors.primary100,
    borderRadius: RADIUS,
  },
  cart: {},
});

export default styles;
