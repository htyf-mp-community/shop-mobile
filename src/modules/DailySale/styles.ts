import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "PoppinsBold",
    marginLeft: 5,
  },
  image_container: {
    width: WIDTH,
    padding: 10,
    position: "relative",
  },
  image: {
    height: 240,
    padding: 10,
    borderRadius: 5,
  },
  off: {
    position: "absolute",
    top: -5,
    left: 10,
    zIndex: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    color: "#fff",
    backgroundColor: Colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  saved: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: Colors.primary100,
    color: "#fff",
    fontSize: 25,
    zIndex: 20,
    padding: 5,
  },
  details: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 5,
  },
  button: {
    width: "100%",
    padding: 15,
    justifyContent: "center",
    marginTop: 10,
  },
  discounted: {
    fontSize: 18,
    marginTop: 5,
    color: "red",
    textDecorationLine: "line-through",
  },
  bottom_tab: {
    width: WIDTH,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
