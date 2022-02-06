import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.9,
  },
  buttonContainer: {
    width,
    padding: 10,
    height: height * 0.1,
  },
  button: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#1e3a8a",
  },
});

export default styles;
