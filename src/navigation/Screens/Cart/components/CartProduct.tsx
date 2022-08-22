import { CartProps, useNavigationProps } from "/@types/types";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { image } from "functions/image";
import layout from "constants/layout";
import { Fonts } from "constants/styles";
import { useNavigation } from "@react-navigation/native";
import {
  CartAddIconButton,
  CartRemoveIconButton,
} from "modules/Cart/IconButtons";

interface CartProductProps {
  product: CartProps;
}

export default function CartProduct({ product }: CartProductProps) {
  const navigation = useNavigation<useNavigationProps>();

  const img = image(product.img_id);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Details", {
          sharedID: "",
          title: product.title,
          prod_id: product.prod_id,
          image: img.uri,
        })
      }
      style={{
        width: layout.screen.width,
        padding: 10,
        marginTop: 5,
        flexDirection: "row",
      }}
    >
      <Image
        style={{
          flex: 2,
          height: "100%",
          borderRadius: 3,
        }}
        source={img}
      />
      <View
        style={{
          flex: 3,
          paddingHorizontal: 5,
          justifyContent: "flex-start",
        }}
      >
        <Text
          numberOfLines={3}
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: Fonts.PoppinsMedium,
          }}
        >
          {product.title}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginTop: 5,
            fontWeight: "bold",
          }}
        >
          ${product.price}
        </Text>
      </View>
      <Pressable style={{ flex: 0.5, alignItems: "center" }}>
        <CartAddIconButton prod_id={product.prod_id} />
        <Text style={{ color: "#fff", fontSize: 16, paddingVertical: 5 }}>
          {product.ammount}
        </Text>
        <CartRemoveIconButton cart_id={product.cart_id} />
      </Pressable>
    </TouchableOpacity>
  );
}
