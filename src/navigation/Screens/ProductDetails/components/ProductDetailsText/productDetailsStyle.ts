import { StyleSheet } from "react-native";
import { Colors } from "@constants/styles";

const RADIUS = 10;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  title: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    paddingLeft: 10,
    padding: 15,
  },
  description: {
    fontSize: 17,
    marginBottom: 20,
    paddingLeft: 15,
  },
  price: {
    color: "#fff",
    fontSize: 18,
    backgroundColor: Colors.primary100,
    padding: 7,
    borderRadius: 5,
    width: 75,
    textAlign: "center",
  },
  category: {
    color: "#fff",
    padding: 15,
    backgroundColor: Colors.primary100,
    borderRadius: RADIUS,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary100,
    alignItems: "center",
  },
});

export default styles;
