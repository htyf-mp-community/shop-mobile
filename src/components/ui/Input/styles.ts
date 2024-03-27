import { Colors } from "constants/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 15,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    flex: 1,
    textDecorationLine: "none",
    minHeight: 50,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 2.5,
  },
});

export default styles;
