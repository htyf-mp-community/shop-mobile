import { StyleSheet } from "react-native";
import { Colors, radius } from "../../constants/styles";
import {
  PRODUCT_CONTAINER_SIZE_X,
  PRODUCT_CONTAINER_SIZE_Y,
  PRODUCT_HEIGHT,
  PRODUCT_WIDTH,
} from "./assets";

const styles = StyleSheet.create({
  container: {
    width: PRODUCT_CONTAINER_SIZE_X,
    height: PRODUCT_CONTAINER_SIZE_Y,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  product: {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
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
  remove_button: {
    backgroundColor: "red",
    padding: 12,
    justifyContent: "center",
  },
});

export default styles;
