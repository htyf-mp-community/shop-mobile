import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useUser } from "utils/context/UserContext";

export interface State {
  status: 201 | 400;
  message: string;
  error: string | null;
  hasFinished: boolean;
}

const CREATE_RATING = gql`
  mutation CreateRating(
    $title: String!
    $description: String!
    $prod_id: Int!
    $rating: Int!
  ) {
    createRating(
      rating: {
        title: $title
        description: $description
        prod_id: $prod_id
        rating: $rating
      }
    ) {
      rating_id
      rating
      title
      description
    }
  }
`;

export default function useUploadReview() {
  const [response, setResponse] = useState<Partial<State>>({});
  const { user } = useUser();

  const [post] = useMutation(CREATE_RATING, {
    context: {
      headers: {
        token: user.token,
      },
    },
    update(cache, { data: { createRating } }) {
      cache.modify({
        fields: {
          ratings(existingRatings = []) {
            return [...existingRatings, createRating];
          },
        },
      });
    },

    onCompleted: () => {
      setResponse({
        status: 201,
        error: null,
        hasFinished: true,
        message:
          "Your opinion has been uploaded, thank you for your contribution",
      });
    },

    onError: (err) =>
      setResponse({
        status: 400,
        hasFinished: true,
        error: err.message,
        message: err.message,
      }),
  });

  return { upload: post, response, setResponse };
}
