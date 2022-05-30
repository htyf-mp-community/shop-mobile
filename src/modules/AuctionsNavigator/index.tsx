import { useWindowDimensions, View, Text, FlatList } from "react-native";
import Auction from "navigation/Screens/Auction/components/Auction";
import useAuctions from "./useAuctions";
import Ripple from "react-native-material-ripple";
import useColorTheme from "utils/context/ThemeContext";
import { Fonts } from "constants/styles";

export default function AuctionsNavigator() {
  const { width } = useWindowDimensions();
  const { data } = useAuctions();
  const { theme } = useColorTheme();

  return (
    <View style={{ width, padding: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.auctions}
        keyExtractor={({ auction_id }) => auction_id}
        renderItem={({ item, index }) => (
          <Auction
            images={item.product.img_id}
            isLast={index === data?.auction?.length}
            {...item}
          />
        )}
      />

      <Ripple>
        <Text
          style={{
            padding: 5,
            color: theme.text,
            fontSize: 20,
            fontFamily: Fonts.PoppinsMedium,
          }}
        >
          See all auctions
        </Text>
      </Ripple>
    </View>
  );
}
