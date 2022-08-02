import { AuctionBid } from "/@types/types";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Padding } from "constants/styles";
import Ripple from "react-native-material-ripple";
import { useUser } from "utils/context/UserContext";

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

interface BidsProps {
  onOpenModal?: () => void;
  bid: AuctionBid;
  width?: number;
  showLabel?: boolean;
}

export default function Bid({
  bid,
  onOpenModal,
  width: bidWidth,
  showLabel = false,
}: BidsProps) {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      {showLabel && (
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
        <Text style={styles.text}>${bid?.amount ?? 0}</Text>
        {user.user_id === bid.user && <Text style={[styles.text]}>You</Text>}
        <Text style={styles.text}>
          At: {new Date(+bid.date_add).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
