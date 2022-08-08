import { CartProps, useNavigationProps } from "/@types/types";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { image } from "functions/image";
import layout from "constants/layout";
import { Colors, Fonts } from "constants/styles";
import { ReactNode } from "react";
import Ripple from "react-native-material-ripple";
import { Entypo } from "@expo/vector-icons";
import useAddCart from "@modules/AddToCart/useAddCart";
import useRemoveCart from "../hooks/useRemoveCart";
import { useNavigation } from "@react-navigation/native";

interface CartProductProps {
  product: CartProps;
}

interface IconButtonProps {
  onPress: () => void;
  icon: ReactNode;
  disabled?: boolean;
}

const IconButton = ({ icon, onPress, disabled }: IconButtonProps) => (
  <Ripple
    disabled={disabled}
    rippleCentered
    rippleColor="white"
    onPress={onPress}
    style={{
      width: 30,
      height: 30,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.primary100,
    }}
  >
    {icon}
  </Ripple>
);

export default function CartProduct({ product }: CartProductProps) {
  const { remove, loading: loadingRemove } = useRemoveCart();
  const { pushToCart: addToCart, loading: loadingAdd } = useAddCart(
    product.prod_id
  );

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
        style={{ flex: 3, paddingHorizontal: 5, justifyContent: "flex-start" }}
      >
        <Text
          numberOfLines={2}
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
        <IconButton
          disabled={loadingAdd}
          onPress={() => addToCart()}
          icon={<Entypo color="white" name="plus" />}
        />
        <Text style={{ color: "#fff", fontSize: 16, paddingVertical: 5 }}>
          {product.ammount}
        </Text>
        <IconButton
          disabled={loadingRemove}
          onPress={() => remove(product.cart_id)}
          icon={<Entypo color="white" name="minus" />}
        />
      </Pressable>
    </TouchableOpacity>
  );
}
