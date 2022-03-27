import { gql, useQuery } from "@apollo/client";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useUser } from "utils/context/UserContext";
import Auction from "./Auction";

const GET_AUCTIONS = gql`
  query {
    auctions {
      auction_id
      product {
        prod_id
        title
        img_id {
          name
        }
      }
      bids {
        amount
        bid_id
      }
    }
  }
`;

export default function AuctionList() {
  const { user } = useUser();
  const { data } = useQuery(GET_AUCTIONS, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  const { width } = useWindowDimensions();
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={{ width, paddingTop: 10, paddingBottom: 10 }}
      data={data?.auctions || []}
      keyExtractor={({ auction_id }) => auction_id}
      horizontal
      renderItem={({ item, index }) => (
        <Auction isFirst={index === 0} bids={item.bids} {...item.product} />
      )}
    />
  );
}
