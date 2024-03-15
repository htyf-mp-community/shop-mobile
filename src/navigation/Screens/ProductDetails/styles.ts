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
    height: 80,
    flexDirection: "row",
  },

  favButton: {
    padding: 5,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  button: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    height: "100%",
    flex: 2,
  },
});

export default styles;
