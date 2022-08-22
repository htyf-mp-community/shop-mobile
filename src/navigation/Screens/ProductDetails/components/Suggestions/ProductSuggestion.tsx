import { FlatList, Image, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import type { ProductMinified, useNavigationProps } from "/@types/types";
import { image } from "functions/image";
import useQuerySuggestions from "./useQuerySuggestions";
import { Fonts } from "constants/styles";
import { useMemo } from "react";

interface SuggestionProps {
  text?: string;
}

export default function ProductSuggestion({
  text: productTitle = "",
}: SuggestionProps) {
  const { data } = useQuerySuggestions(productTitle);

  const navigation = useNavigation<useNavigationProps>();

  function navigateProduct(item: ProductMinified) {
    navigation.push("Details", {
      image: image(item.img_id).uri,
      title: item.title,
      prod_id: item.prod_id,
      sharedID: "",
    });
  }

  const filteredProducts = useMemo(
    () => data?.suggestions.filter(({ title }) => title !== productTitle),
    [data?.suggestions]
  );

  const hasMoreThanOne =
    typeof data?.suggestions !== "undefined" && data?.suggestions.length > 1;

  return hasMoreThanOne ? (
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
        data={filteredProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ padding: 5, marginBottom: 10 }}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        renderItem={({ item, index }) => (
          <Ripple
            onPress={() => navigateProduct(item)}
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
