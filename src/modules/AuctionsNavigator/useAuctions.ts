import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";

const GET_AUCTIONS = gql`
  query Auctions {
    auctions(take: 3) {
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

export default function useAuctions() {
  const { user } = useUser();

  return useQuery(GET_AUCTIONS, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
