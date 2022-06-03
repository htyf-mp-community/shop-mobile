import { useQuery } from "@apollo/client";
import { Product } from "/@types/types";
import { useUser } from "utils/context/UserContext";
import { GET_PRODUCT } from "./schema";

interface ProductResponse {
  product?: Required<Product>;
}

export default function useProduct(prod_id: number) {
  const { user } = useUser();

  return useQuery<ProductResponse>(GET_PRODUCT, {
    variables: {
      prod_id,
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
