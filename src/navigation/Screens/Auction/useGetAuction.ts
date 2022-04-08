import { useQuery, gql } from "@apollo/client";
import { Auction } from "/@types/types";
import { useUser } from "utils/context/UserContext";

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

interface Response {
  auction?: Auction;
}

export default function useGetAuction(auction_id: string) {
  const { user } = useUser();
  return useQuery<Response>(GET_AUCTION, {
    variables: {
      auction_id,
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
