import { useQuery } from "@apollo/client";
import { Product, ProductMinified } from "/@types/types";
import { useUser } from "utils/context/UserContext";
import { GET_PRODUCT } from "./schema";
import { useEffect } from "react";

interface ProductResponse {
  product?: Required<Product>;
  suggestions?: ProductMinified[];
}

export default function useProduct(prod_id: number, name: string) {
  const { user } = useUser();

  const query = useQuery<ProductResponse>(GET_PRODUCT, {
    variables: {
      prod_id,
      name: name.split(" ").slice(0, 2).join(" "),
    },
    context: {
      headers: {
        token: user.token,
      },
    },
    onError: (err) => console.log(JSON.stringify(err, null, 2)),
  });

  useEffect(() => {
    return () => {
      query.client.stop();
    };
  }, []);

  return query;
}
