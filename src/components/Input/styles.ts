import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";

const { width: WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,

    fontSize: 18,
    borderRadius: 5,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    flex: 1,
  },
  label: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
  },
});

export default styles;
