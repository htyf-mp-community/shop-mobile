import { StyleSheet, Dimensions } from "react-native";
import { Colors, radius } from "../../constants/styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT / 3.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  product: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT / 3.5,
    position: "relative",
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.small,
  },

  text: {
    color: Colors.secondary,
    marginLeft: 10,
  },
  button: {
    color: Colors.text,
    width: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.secondary,
  },
  info: {
    backgroundColor: Colors.secondary,
    color: Colors.text,
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 18,
    padding: 10,
    borderRadius: radius.small,
  },
});

export default styles;
