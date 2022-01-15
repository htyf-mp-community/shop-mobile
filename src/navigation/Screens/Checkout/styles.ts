import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";

const { width } = Dimensions.get("window");

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
});

export default styles;
