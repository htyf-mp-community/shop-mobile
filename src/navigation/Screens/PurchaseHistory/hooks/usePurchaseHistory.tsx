import { gql, useQuery } from "@apollo/client";
import { useUser } from "@utils/context/UserContext";
import { ProductMinified } from "/@types/types";

export interface IHistory {
  date: string;

  payment: null | {
    total_price: number;
  };

  prod_id: ProductMinified;
}

const GET_HISTORY = gql`
  query History($skip: Int) {
    history(skip: $skip) {
      date

      payment {
        total_price
      }

      prod_id {
        prod_id
        price
        title
        img_id(take: 1) {
          name
        }
      }
    }
  }
`;

export default function usePurchaseHistory() {
  const { user } = useUser();
  return useQuery<{ history: IHistory[] }>(GET_HISTORY, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
