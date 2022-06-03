import { useUser } from "utils/context/UserContext";
import { useQuery } from "@apollo/client";
import { GET_SUGGESTIONS } from "../../hooks/schema";
import { ProductMinified } from "/@types/types";

function extractFrazes(input: string) {
  const [one, two] = input.split(" ");

  return `${one} ${two ?? ""}`;
}

interface SuggestionResponse {
  suggestions: ProductMinified[];
}

export default function useQuerySuggestions(text: string) {
  const { user } = useUser();

  return useQuery<SuggestionResponse>(GET_SUGGESTIONS, {
    variables: {
      name: extractFrazes(text),
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
