import { useWindowDimensions, View, Text, FlatList } from "react-native";
import Auction from "navigation/Screens/Auction/components/Auction";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuctions from "./useAuctions";

export default function AuctionsNavigator() {
  const { width } = useWindowDimensions();

  const { data } = useAuctions();

  return (
    <View style={{ width, padding: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.auctions}
        keyExtractor={({ auction_id }) => auction_id}
        renderItem={({ item }) => (
          <Auction img_id={item.product.img_id} {...item} />
        )}
      />

      <TouchableOpacity>
        <Text
          style={{ color: "#fff", fontSize: 20, fontFamily: "PoppinsRegular" }}
        >
          See all auctions
        </Text>
      </TouchableOpacity>
    </View>
  );
}
