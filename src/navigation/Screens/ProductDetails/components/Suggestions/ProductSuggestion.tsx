import { FlatList, useWindowDimensions, Image, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { API } from "@constants/routes";
import { useNavigation } from "@react-navigation/native";
import type { useNavigationProps } from "/@types/types";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";

interface ProductSuggestionProps {
  text: string;
}

function extractFrazes(input: string) {
  const [one, two] = input.split(" ");

  return `${one} ${two ?? ""}`;
}

const GET_SUGGESTIONS = gql`
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

export default function ProductSuggestion({
  text = "",
}: ProductSuggestionProps) {
  const { user } = useUser();
  const { data } = useQuery(GET_SUGGESTIONS, {
    variables: {
      name: extractFrazes(text),
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  const { width } = useWindowDimensions();
  const navigation = useNavigation<useNavigationProps>();

  // if it searches for element with simmilar title there always should be current element we dont want to display
  if (
    typeof data?.suggestions === "undefined" ||
    data?.suggestions.length === 1
  )
    return null;

  return (
    <>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          paddingLeft: 10,
          fontFamily: "PoppinsBold",
        }}
      >
        Check these out
      </Text>
      <FlatList
        data={data?.suggestions.filter(({ title }: any) => title !== text)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width, padding: 5, marginBottom: 10 }}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        renderItem={({ item, index }) => (
          <Ripple
            onPress={() =>
              navigation.replace("Details", {
                image: `${API}/upload/images=${item.img_id?.[0].name}`,
                title: item.title,
                prod_id: item.prod_id,
                sharedID: "",
              })
            }
            style={{ marginRight: 10, marginLeft: index === 0 ? 8 : 0 }}
          >
            <Image
              style={{
                width: 150,
                height: 100,
                borderRadius: 3,
              }}
              source={{ uri: `${API}/upload/images=${item.img_id?.[0].name}` }}
            />
          </Ripple>
        )}
      />
    </>
  );
}
