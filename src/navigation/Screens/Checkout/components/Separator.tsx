import { Text, Dimensions } from "react-native";
import { Fonts } from "constants/styles";

const { width } = Dimensions.get("screen");

const Separator = ({ text }: { text: string }) => (
  <Text
    style={{
      fontFamily: Fonts.PoppinsMedium,
      color: "#fff",
      fontSize: 22,
      padding: 10,
      paddingHorizontal: 15,
      width,
    }}
  >
    {text}
  </Text>
);

export default Separator;
