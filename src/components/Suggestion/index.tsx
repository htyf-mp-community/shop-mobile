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
import Button from "components/ui/Button/Button";
import layout from "constants/layout";

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
          <Image
            resizeMode="contain"
            source={thumbnail}
            style={[
              styles.image,
              { width: layout.screen.width - 40, height: 250 },
            ]}
          />
        </SharedElement>
      </Ripple>

      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.price}>${price}</Text>
        </View>

        <Button
          size="xl"
          onPress={() => onPress()}
          variant="primary"
          type="contained"
          text="Add to cart"
          fontStyle={{ textTransform: "uppercase", fontSize: 16 }}
          style={{ flexDirection: "row-reverse", marginTop: 5 }}
          icon={
            result === "Added" && (
              <AntDesign
                size={21}
                color={"#fff"}
                name="check"
                style={{ marginRight: 5 }}
              />
            )
          }
        />
      </View>
    </Animated.View>
  );
}

export default React.memo(Suggestion);
