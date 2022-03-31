import { gql, useQuery } from "@apollo/client";
import { ScreenNavigationProps } from "/@types/types";
import {
  FlatList,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { useUser } from "utils/context/UserContext";
import { API } from "constants/routes";
import { Colors, Padding } from "constants/styles";

const GET_AUCTION = gql`
  query Auction($auction_id: ID!) {
    auction(auction_id: $auction_id) {
      auction_id
      product {
        prod_id
        title
        description
        img_id {
          id
          name
        }
      }
      bids {
        date_add
        bid_id
        amount
      }
    }
  }
`;

export default function AuctionScreen({
  route,
}: Required<ScreenNavigationProps<"Auction">>) {
  const { user } = useUser();
  const { data, error } = useQuery(GET_AUCTION, {
    variables: {
      auction_id: route.params.auction_id,
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  const { width } = useWindowDimensions();

  return <ScrollView style={{ backgroundColor: Colors.primary }}></ScrollView>;
}
