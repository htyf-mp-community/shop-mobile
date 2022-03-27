import { gql, useQuery } from "@apollo/client";
import { View } from "react-native";
import { useUser } from "utils/context/UserContext";

const GET_AUCTION = gql`
  query {
    auction {
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
      }
    }
  }
`;

export default function AuctionScreen() {
  const { user } = useUser();
  const { data } = useQuery(GET_AUCTION, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  console.log(data);

  return <View style={{ flex: 1 }}></View>;
}
