import { CartProps, useNavigationProps } from "/@types/types";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { image } from "functions/image";
import layout from "constants/layout";
import { Fonts } from "constants/styles";
import { useNavigation } from "@react-navigation/native";
import {
  CartAddIconButton,
  CartRemoveIconButton,
} from "modules/Cart/IconButtons";
import Checkbox from "expo-checkbox";
import Animated, {
  FadeIn,
  Layout,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    width: layout.screen.width,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: "row",

    marginBottom: 20,
  },
  image: {
    flex: 2,
    height: "100%",
    borderRadius: 3,
  },
  content_container: {
    flex: 3,
    paddingHorizontal: 5,
    paddingLeft: 10,
    justifyContent: "flex-start",
  },
  price: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
  },
});

interface CartProductProps {
  product: CartProps;

  productIndex?: number;

  handleSelectProduct: (value: boolean) => void;

  isProductSelected: boolean;

  showCheckbox: boolean;

  handleShowCheckbox: () => void;
}

export default function CartProduct({
  product,
  handleSelectProduct,
  isProductSelected,
  showCheckbox,
  handleShowCheckbox,
  productIndex = 0,
}: CartProductProps) {
  const navigation = useNavigation<useNavigationProps>();

  const img = image(product.img_id);

  const delay = productIndex * 75; //ms

  const navigate = () =>
    navigation.navigate("Product", {
      sharedID: "",
      title: product.title,
      prod_id: product.prod_id,
      image: img.uri,
    });

  const onLongPress = () => {
    handleShowCheckbox();
    handleSelectProduct(true);
  };

  return (
    <Animated.View entering={FadeIn.delay(delay)} layout={Layout.delay(100)}>
      {showCheckbox && (
        <Animated.View
          entering={SlideInLeft.delay(delay)}
          exiting={SlideOutLeft.delay(delay)}
        >
          <Checkbox
            value={isProductSelected}
            onValueChange={handleSelectProduct}
            style={{ marginLeft: 10 }}
          />
        </Animated.View>
      )}
      <TouchableOpacity
        delayLongPress={500}
        onLongPress={onLongPress}
        activeOpacity={0.8}
        onPress={navigate}
        style={[
          styles.container,
          {
            marginTop: showCheckbox ? 10 : 0,
          },
        ]}
      >
        <Image style={styles.image} source={img} />
        <View style={styles.content_container}>
          <Text numberOfLines={3} style={styles.title}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Pressable style={{ flex: 0.5, alignItems: "center" }}>
          <CartAddIconButton
            prod_id={product.prod_id}
            isDisabled={product.ammount > 100} // TODO: change to product.quantity
          />
          <Text style={{ color: "#fff", fontSize: 16, paddingVertical: 5 }}>
            {product.ammount}
          </Text>
          <CartRemoveIconButton cart_id={product.cart_id} />
        </Pressable>
      </TouchableOpacity>
    </Animated.View>
  );
}
