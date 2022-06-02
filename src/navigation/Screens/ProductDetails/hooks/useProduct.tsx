import { useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";
import { GET_PRODUCT } from "./schema";

export default function useProduct(prod_id: number) {
  const { user } = useUser();

  return useQuery(GET_PRODUCT, {
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
