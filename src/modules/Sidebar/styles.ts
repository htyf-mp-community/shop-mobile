import { Colors } from "../../constants/styles";
import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  navigation: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH * 0.6,
    height: HEIGHT * 0.8,
  },
  head: {
    color: Colors.text,
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    marginBottom: 10,
    marginTop: 50,
  },
  button: {
    backgroundColor: Colors.primary100,
    flexDirection: "row-reverse",
    width: WIDTH * 0.5,
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  sidebar: {
    backgroundColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    position: "relative",
  },
});

export default styles;
