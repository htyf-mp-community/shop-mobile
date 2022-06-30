import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";

const GET_AUCTIONS = gql`
  query GetAuctions($skip: Int = 0) {
    auctions(skip: $skip, take: 5) {
      auction_id
      bids(take: 1) {
        amount
      }
      product {
        title
        category
        img_id(take: 1) {
          name
        }
      }
    }
  }
`;

export default function useGetPendingAuctions() {
  const { user } = useUser();

  return useQuery(GET_AUCTIONS, {
    errorPolicy: "ignore",
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
