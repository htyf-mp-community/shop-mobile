import React, { memo } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import Button from "../../components/Button/Button";
import AddToCart from "../AddToCart/AddToCart";
import { API } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Colors } from "../../constants/styles";
import * as Types from "../../@types/types";
import { PRODUCT_WIDTH, PRODUCT_WIDTH_FULLSIZE } from "./assets";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export type ProductTypeProps = Types.Product & {
  route?: string;
  deleteFn?: () => void;
  sharedID?: string;
  hide?: boolean;
  ammount?: number;
  RefetchCart?: (id: number) => void;
  style?: StyleProp<ViewStyle>;
  fullSize?: boolean;
  discounted_price?: null | undefined | number;
};

const notfound =
  "data:image/png;base64,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";

function Product({
  price,
  prod_id,
  img_id,
  route,
  title,
  hide = false,
  sharedID = "Key",
  deleteFn = () => {},
  RefetchCart,
  style,
  fullSize,
}: ProductTypeProps) {
  const navigation = useNavigation<Types.useNavigationProps>();

  const image = img_id[0]?.name
    ? `${API}/upload/images=${img_id[0]?.name}`
    : notfound;

  function ShowMore() {
    navigation.navigate("Details", {
      prod_id,
      image,
      sharedID,
      title,
    });
  }

  const ElementWidth = fullSize ? PRODUCT_WIDTH_FULLSIZE : PRODUCT_WIDTH;

  return (
    <TouchableOpacity
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
            source={{ uri: image }}
            style={[styles.img]}
            resizeMode="cover"
          />
        </SharedElement>

        {!hide && (
          <>
            {route === "Cart" && (
              <Button
                callback={deleteFn}
                style={[styles.button, styles.remove_button]}
                icon={<Ionicons name="close" size={22} color={Colors.text} />}
              />
            )}

            <AddToCart
              refetch={() => RefetchCart?.(prod_id!)}
              prod_id={prod_id}
              style={{ right: route === "Cart" ? 70 : 10 }}
            />
          </>
        )}

        <Text style={styles.info}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default memo(Product);
