import { gql, useQuery } from "@apollo/client";
import { useUser } from "@utils/context/UserContext";
import { Product } from "/@types/types";

interface Prods {
  history_id?: number;
  prod_id?: Product;
}

export interface IHistory {
  date?: string;
  payment_id?: string;
  total_price?: number;
  status?: string;

  products?: Prods[];
}

const GET_HISTORY = gql`
  query History {
    history {
      date
      payment_id
      total_price
      status
      products {
        history_id
        prod_id {
          prod_id
          price
          title
          img_id(take: 1) {
            id
            name
          }
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
