import useCart from "modules/Cart/AddToCart/useAddCart";
import React from "react";
import { View, Image, Text } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { SuggestionType, useNavigationProps } from "../../@types/types";
import { API } from "../../constants/routes";
import styles from "./Suggestion.styles";
import { AntDesign } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import Animated, { FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { image } from "@functions/image";

interface SuggestionProps extends SuggestionType {
  index: number;
}

function Suggestion({
  image: img,
  prod_id,
  title,
  price,
  index,
}: SuggestionProps) {
  const thumbnail = image(img);

  const sharedID = "Search";

  const navigation = useNavigation<useNavigationProps>();

  function navigateToProduct() {
    navigation.navigate("Product", {
      prod_id,
      title: title,
      image: thumbnail.uri,
      sharedID: "Search",
      previousScreen: "Search",
      isSharedAnimationUsed: true,
    });
  }

  const { pushToCart: onPress, result } = useCart(prod_id);

  return (
    <Animated.View
      entering={FadeIn.delay((index % 10) * 100)}
      style={styles.container}
    >
      <Ripple onPress={navigateToProduct}>
        <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
          <Image resizeMode="cover" source={thumbnail} style={styles.image} />
        </SharedElement>
      </Ripple>

      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.price}>${price}</Text>
          <Ripple
            onPress={() => onPress()}
            style={{ padding: 10, flexDirection: "row" }}
            rippleColor="#fff"
          >
            {result === "Added" && (
              <AntDesign name="check" size={20} color="white" />
            )}
            <Text style={{ color: "#DADDE2" }}>ADD TO CART</Text>
          </Ripple>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Animated.View>
  );
}

export default React.memo(Suggestion);
