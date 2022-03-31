import { gql, useQuery } from "@apollo/client";
import { useWindowDimensions, View, Text, FlatList } from "react-native";
import { useUser } from "utils/context/UserContext";
import Auction from "navigation/Screens/Auction/components/Auction";
import { TouchableOpacity } from "react-native-gesture-handler";

const GET_AUCTIONS = gql`
  query Auctions {
    auctions {
      auction_id
      product {
        title
        img_id {
          name
        }
      }
      date_end
      bids {
        amount
      }
    }
  }
`;

export default function AuctionsNavigator() {
  const { width } = useWindowDimensions();

  const { user } = useUser();

  const { data } = useQuery(GET_AUCTIONS, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

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
