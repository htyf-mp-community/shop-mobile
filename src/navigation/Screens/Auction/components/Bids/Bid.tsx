import { AuctionBid } from "/@types/types";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Padding } from "constants/styles";
import Ripple from "react-native-material-ripple";

interface BidsProps {
  onOpenModal: () => void;
  bid: AuctionBid;
  width?: number;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: Padding.medium,
  },
  helperText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    fontFamily: "PoppinsMedium",
  },
  highest: {
    width: width - Padding.medium * 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    padding: Padding.small,
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    color: "#fff",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
    fontSize: 15,
  },
});

export default function Bid({ bid, onOpenModal, width: bidWidth }: BidsProps) {
  return (
    <View style={styles.container}>
      {!bidWidth && (
        <View style={styles.row}>
          <Text style={styles.helperText}>Highest bid</Text>
          <Ripple onPress={onOpenModal}>
            <Text style={styles.button}>See more</Text>
          </Ripple>
        </View>
      )}
      <View
        style={[
          styles.highest,
          { width: bidWidth, marginTop: bidWidth ? 0 : 15 },
        ]}
      >
        <Text style={styles.text}>${bid.amount}</Text>
        <Text style={styles.text}>
          At: {new Date(+bid.date_add).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
