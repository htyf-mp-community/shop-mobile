import { ThemedText } from "components";
import { Fonts } from "constants/styles";
import { View } from "react-native";
import styles from "../styles";

export default function Headings() {
  return <></>;
}

Headings.Title = (props: { text: string }) => (
  <ThemedText
    style={{
      fontSize: 20,
      marginLeft: 20,
      fontFamily: Fonts.PoppinsRegular,
    }}
  >
    {props.text}
  </ThemedText>
);

Headings.Price = (props: { price: number; quantity: number }) => (
  <View
    style={[styles.row, { width: "100%", justifyContent: "space-between" }]}
  >
    <View style={[styles.row, { width: "50%" }]}>
      <ThemedText style={[styles.price]}>${props.price}</ThemedText>
      <ThemedText style={styles.discounted}>
        ${Math.ceil((props.price || 0) * 1.25)}
      </ThemedText>
    </View>
    <ThemedText>{props.quantity} Left</ThemedText>
  </View>
);
