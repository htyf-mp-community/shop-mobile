import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query product($prod_id: Int!) {
    product(prod_id: $prod_id) {
      prod_id
      price
      title
      description
      category
      manufacturer
      quantity

      rating

      img_id(take: 10, skip: 1) {
        id
        name
      }

      rating_id(take: 3) {
        title
        rating_id
        description
        rating
      }
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query Suggestions($name: String!) {
    suggestions(name: $name) {
      prod_id
      title
      price
      img_id(take: 1) {
        name
      }
    }
  }
`;
