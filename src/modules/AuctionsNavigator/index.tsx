import { useWindowDimensions, View, Text, FlatList } from "react-native";
import Auction from "navigation/Screens/Auction/components/Auction";
import useAuctions from "./useAuctions";
import Ripple from "react-native-material-ripple";
import useColorTheme from "utils/context/ThemeContext";
import { Fonts } from "constants/styles";
import { useCallback } from "react";
import Loader from "./Loader";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";

export default function AuctionsNavigator() {
  const { width } = useWindowDimensions();
  const { data, loading } = useAuctions();

  const { theme } = useColorTheme();

  const renderItem = useCallback(
    ({ item, index }) => (
      <Auction
        images={item.product.img_id}
        isLast={index === data?.auction?.length}
        {...item}
      />
    ),
    []
  );

  const navigation = useNavigation<useNavigationProps>();

  return (
    <View style={{ width, padding: 10 }}>
      <Text
        style={{
          fontSize: 30,
          color: theme.text,
          paddingTop: 5,
          fontFamily: Fonts.PoppinsBold,
        }}
      >
        Auctions
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.auctions}
          keyExtractor={({ auction_id }) => auction_id}
          renderItem={renderItem}
        />
      )}

      <Ripple onPress={() => navigation.navigate("Auctions")}>
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
