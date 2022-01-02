import React from "react";
import { useWindowDimensions, View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { SuggestionType, useNavigationProps } from "../../@types/types";
import { API } from "../../constants/routes";

interface SuggestionProps extends SuggestionType {
  navigation: useNavigationProps;
}

export default function Suggestion({
  navigation,
  image,
  prod_id,
  title,
  price,
}: SuggestionProps) {
  const { width } = useWindowDimensions();

  function navigateToProduct() {
    navigation.navigate("Details", {
      prod_id,
      title: title,
      image: `${API}/upload/images=${image}`,
      sharedID: "Search",
    });
  }

  return (
    <TouchableOpacity
      style={{
        width: width,
        backgroundColor: "#111111",
        margin: 10,
        padding: 10,
        flexDirection: "row",
      }}
      onPress={navigateToProduct}
    >
      <SharedElement id={`prod_id.${prod_id}Search`}>
        <Image
          source={{ uri: `${API}/upload/images=${image}` }}
          style={{ width: 75, height: 75 }}
        />
      </SharedElement>
      <View style={{ paddingLeft: 5 }}>
        <Text
          style={{ color: "#fff", fontSize: 20, fontFamily: "PoppinsRegular" }}
        >
          {title}
        </Text>
        <Text style={{ color: "#fff", fontSize: 18 }}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
}
