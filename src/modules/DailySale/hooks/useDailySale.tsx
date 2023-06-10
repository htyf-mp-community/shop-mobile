import { gql, useQuery } from "@apollo/client";
import { ProductImageProps } from "/@types/types";
import { useUser } from "utils/context/UserContext";

export interface Sale {
  prod_id: number;
  price: number;
  quantity: number;
  title: string;
  img_id: ProductImageProps[];
  rating: number;
}

export const GET_SALE = gql`
  query Sale {
    sale {
      prod_id
      price
      quantity
      title
      rating
      img_id(take: 3) {
        name
        id
      }
    }
  }
`;

export default function useDailySale() {
  const { user } = useUser();

  return useQuery<{ sale: Sale }>(GET_SALE, {
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
