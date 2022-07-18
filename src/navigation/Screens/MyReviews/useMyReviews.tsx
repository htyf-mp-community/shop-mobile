import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useUser } from "utils/context/UserContext";
import RemoveProductsRepetition from "functions/RemoveRepetition";
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
  const [skip, setSkip] = useState(0);
  const { user } = useUser();
  const { data, loading, client, fetchMore } = useQuery<{
    ratings: Rating[];
  }>(GET_RATINGS, {
    context: {
      headers: {
        token: user.token,
      },
    },
    variables: { skip: 0 },
  });

  useEffect(() => {
    fetchMore({
      variables: { skip },

      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult?.ratings?.length) return prev;

        return {
          ratings: RemoveProductsRepetition(
            [...prev.ratings, ...(fetchMoreResult.ratings || [])],
            "rating_id"
          ),
        };
      },
    });
    return () => {
      client.stop();
    };
  }, [skip]);

  return { data, loading, setSkip };
}
