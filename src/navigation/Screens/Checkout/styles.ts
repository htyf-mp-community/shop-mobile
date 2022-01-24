import { CardFieldInput } from "@stripe/stripe-react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";

const { width, height } = Dimensions.get("screen");

export const cardFieldStyles: CardFieldInput.Styles = {
  backgroundColor: "#1e293b",
  placeholderColor: "#ffffff",
  textColor: "#ffffff",
  borderRadius: 10,
  cursorColor: "#ffffff",
};

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
    justifyContent: "center",
    alignItems: "center",
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
    position: "absolute",
    zIndex: 10,
    height,
    width,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  innerModal: {
    width,
    height: height * 0.8,
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
  },
  innerText: {
    color: "#fff",
    fontSize: 60,
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
});

export default styles;
