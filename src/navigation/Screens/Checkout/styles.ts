import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 10,
  },

  card: {
    width: "100%",
    height: 60,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },

  input: {
    width: width - 20,
    marginBottom: 5,
  },
  button: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalItems: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    height: width * 0.6,
    width: width * 0.6,
    borderRadius: 10,
  },
});

export default styles;
