import { useState, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { useUser } from "utils/context/UserContext";
import { ProductRatingProps } from "/@types/types";

export type Rating = Omit<ProductRatingProps, "user_id">;

const GET_RATINGS = gql`
  query GetRatings($skip: Int! = 0) {
    ratings(skip: $skip) {
      rating_id
      title
      description
      rating
    }
  }
`;

export default function useMyReviews() {
  const [skip, setSkip] = useState(5);
  const { user } = useUser();
  const {
    data,
    loading = true,
    fetchMore,
  } = useQuery<{
    ratings: Rating[];
  }>(GET_RATINGS, {
    context: {
      headers: {
        token: user.token,
      },
    },
    variables: { skip: 0 },
  });

  const onEndReached = useCallback(async () => {
    await fetchMore({
      variables: { skip },
    });
    setSkip((prev) => prev + 5);
  }, [skip]);

  return { data, loading, onEndReached };
}
