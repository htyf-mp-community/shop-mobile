import { Colors, radius } from "@constants/styles";
import { StyleProp, ViewStyle } from "react-native";

export default {
  width: 45,
  height: 45,
  color: Colors.text,
  fontFamily: "PoppinsMedium",
  position: "absolute",
  zIndex: 3,
  right: 15,
  fontSize: 25,
  padding: 5,
  top: 5,
  borderRadius: radius.medium,
  backgroundColor: Colors.secondary,
  textAlign: "center",
} as StyleProp<ViewStyle>;
