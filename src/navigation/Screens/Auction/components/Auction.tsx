import { ProductImageProps } from "/@types/types";
import { API } from "constants/routes";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { Button } from "components";

import { FontAwesome5 } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 250,
    marginRight: 10,
    position: "relative",
  },
  image: {
    width: width - 40,
    height: 250,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    width: "50%",
    justifyContent: "center",
    flexDirection: "row-reverse",
  },
  bid: {
    width: "50%",
    padding: 10,
    justifyContent: "flex-end",
  },
  bottom_tab: {
    backgroundColor: "rgba(0,0,0,1)",
    borderRadius: 5,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 10,
    height: 75,
  },
});

interface AuctionProps {
  img_id: ProductImageProps[];
  prod_id: number;
  title: string;
  bids: { amount: number; bid_id: string }[];
  isFirst: boolean;
}

export default function Auction({ img_id, isFirst, bids }: AuctionProps) {
  return (
    <View style={[styles.container, { marginLeft: isFirst ? 10 : undefined }]}>
      <Ripple>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: `${API}/upload/images=${img_id[0].name}` }}
        />
      </Ripple>
      {/*  <View style={styles.bottom_tab}>
        <Button
          iconStyle={{ marginRight: 10 }}
          icon={<FontAwesome5 name="money-bill-wave" size={24} color="white" />}
          variant="primary"
          text="Bid me"
          style={styles.button}
        />
        <View style={styles.bid}>
          <Text style={{ color: "#fff", fontSize: 18, width: "100%" }}>
            Highest bid
          </Text>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            ${bids?.[0]?.amount || 0}
          </Text>
        </View>
      </View> */}
    </View>
  );
}
