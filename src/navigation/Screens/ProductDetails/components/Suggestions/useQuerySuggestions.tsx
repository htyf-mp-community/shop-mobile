import { useUser } from "utils/context/UserContext";
import { useQuery } from "@apollo/client";
import { GET_SUGGESTIONS } from "../../hooks/schema";

function extractFrazes(input: string) {
  const [one, two] = input.split(" ");

  return `${one} ${two ?? ""}`;
}

export default function useQuerySuggestions(text: string) {
  const { user } = useUser();

  return useQuery(GET_SUGGESTIONS, {
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
