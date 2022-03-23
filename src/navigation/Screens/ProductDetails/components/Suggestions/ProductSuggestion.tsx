import { SuggestionType } from "/@types/types";
import useFetch from "utils/hooks/useFetch";
import { FlatList, useWindowDimensions, Image, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { API } from "@constants/routes";
import { useNavigation } from "@react-navigation/native";
import type { useNavigationProps } from "/@types/types";

interface ProductSuggestionProps {
  text: string;
}

function extractFrazes(input: string) {
  const [one, two] = input.split(" ");

  return `${one} ${two ?? ""}`;
}

export default function ProductSuggestion({
  text = "",
}: ProductSuggestionProps) {
  const { data } = useFetch<SuggestionType[]>(
    `/products/suggestions?q=${extractFrazes(text)}`
  );
  const { width } = useWindowDimensions();
  const navigation = useNavigation<useNavigationProps>();

  // if it searches for element with simmilar title there always should be current element we dont want to display
  if (typeof data === "undefined" || data.length === 1) return null;

  return (
    <View>
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
        data={data.filter(({ title }) => title !== text)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width, padding: 5, marginBottom: 10 }}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        renderItem={({ item, index }) => (
          <Ripple
            onPress={() =>
              navigation.replace("Details", {
                image: `${API}/upload/images=${item.image}`,
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
              source={{ uri: `${API}/upload/images=${item.image}` }}
            />
          </Ripple>
        )}
      />
    </View>
  );
}
