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
  info: {
    color: Colors.text,
    fontSize: 18,
    marginLeft: 5,
  },
  buttons_container: {
    position: "absolute",
    right: 5,
    borderRadius: 5,
    bottom: 5,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
});

export default styles;
