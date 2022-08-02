import { FlatList, Image, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { API } from "@constants/routes";
import { useNavigation } from "@react-navigation/native";
import type { ProductMinified, useNavigationProps } from "/@types/types";
import { image } from "functions/image";
import useQuerySuggestions from "./useQuerySuggestions";
import { Fonts } from "constants/styles";

interface SuggestionProps {
  text?: string;
}

export default function ProductSuggestion({
  text: productTitle = "",
}: SuggestionProps) {
  const { data } = useQuerySuggestions(productTitle);

  const navigation = useNavigation<useNavigationProps>();

  function onReplaceScreen(item: ProductMinified) {
    navigation.push("Details", {
      image: `${API}/upload/images=${item.img_id?.[0].name}`,
      title: item.title,
      prod_id: item.prod_id,
      sharedID: "",
    });
  }

  const hasMoreThanOne =
    typeof data?.suggestions === "undefined" || data?.suggestions.length === 1;

  return !hasMoreThanOne ? (
    <>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          paddingLeft: 10,
          fontFamily: Fonts.PoppinsBold,
        }}
      >
        Check these out
      </Text>
      <FlatList
        data={data?.suggestions.filter(({ title }) => title !== productTitle)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ padding: 5, marginBottom: 10 }}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        renderItem={({ item, index }) => (
          <Ripple
            onPress={() => onReplaceScreen(item)}
            style={{ marginRight: 10, marginLeft: index === 0 ? 8 : 0 }}
          >
            <Image
              style={{
                width: 150,
                height: 100,
                borderRadius: 3,
              }}
              source={image(item.img_id)}
            />
          </Ripple>
        )}
      />
    </>
  ) : null;
}
