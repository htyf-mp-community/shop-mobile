import { useQuery } from "@apollo/client";
import { Product } from "/@types/types";
import { useUser } from "utils/context/UserContext";
import { GET_PRODUCT } from "./schema";
import { useEffect } from "react";

interface ProductResponse {
  product?: Required<Product>;
}

export default function useProduct(prod_id: number) {
  const { user } = useUser();

  const query = useQuery<ProductResponse>(GET_PRODUCT, {
    variables: {
      prod_id,
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  useEffect(() => {
    return () => {
      query.client.stop();
    };
  }, []);

  return query;
}
