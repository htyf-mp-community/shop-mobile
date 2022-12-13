import React, { memo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import styles from "./styles";
import * as Types from "../../@types/types";
import { PRODUCT_WIDTH, PRODUCT_WIDTH_FULLSIZE } from "./assets";
import { CartButton, WatchlistButton } from "./ActionButtons";
import { image } from "functions/image";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export type ProductTypeProps = Types.ProductMinified & {
  /**
   * Based on route prop component displays Delete button
   **/
  route?: string;
  /**
   * Cart delete function @deprecated
   **/
  onRemoveCartProduct?: () => void | Promise<void>;
  /**
   * String id used to create shared animation
   **/
  sharedID?: string;
  /**
   * @deprecated
   * Should product display action buttons by default prop is set to false
   **/
  hide?: boolean;
  /**
   * Additional styles applied to main product container  **/
  style?: StyleProp<ViewStyle>;

  /**
   * Should product take all the available space
   **/

  fullSize?: boolean;
};

function Product({
  price,
  prod_id,
  img_id,
  title,
  sharedID = "Key",
  style,
  fullSize,
}: ProductTypeProps) {
  const navigation = useNavigation<Types.useNavigationProps>();

  const imageUrl = image(img_id).uri;

  function ShowMore() {
    navigation.navigate("Product", {
      prod_id,
      image: imageUrl,
      sharedID,
      title,

      isSharedAnimationUsed: true,
    });
  }

  const ElementWidth = fullSize ? PRODUCT_WIDTH_FULLSIZE : PRODUCT_WIDTH;

  return (
    <TouchableOpacity
      testID={"product." + prod_id}
      onPress={ShowMore}
      activeOpacity={0.9}
      style={[
        styles.container,
        style,
        { width: fullSize ? SCREEN_WIDTH : PRODUCT_WIDTH_FULLSIZE },
      ]}
    >
      <View style={[styles.product, { width: ElementWidth }]}>
        <SharedElement
          id={`prod_id.${prod_id}${sharedID}`}
          style={[styles.product, { width: ElementWidth }]}
        >
          <Image
            source={{ uri: imageUrl }}
            style={[styles.img]}
            resizeMode="cover"
          />
        </SharedElement>

        <View style={styles.buttons_container}>
          <WatchlistButton prod_id={prod_id} />
          <CartButton prod_id={prod_id} text={`$${price}`} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default memo(Product);
