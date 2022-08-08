import { Dimensions } from "react-native";

const dims_screen = Dimensions.get("screen");
const dims_window = Dimensions.get("window");

export default {
  window: dims_window,
  screen: dims_screen,
};
