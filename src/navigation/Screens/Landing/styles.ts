import { Colors } from "../../../constants/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    position: "relative",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: Colors.text,
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
  },
  button: {
    marginBottom: 15,
    justifyContent: "center",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  social: {
    backgroundColor: Colors.primary100,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    margin: 5,
  },
});

export default styles;
