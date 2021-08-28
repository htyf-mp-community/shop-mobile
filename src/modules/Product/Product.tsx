import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Button from "../../components/Button/Button";
import AddToCart from "../AddToCart/AddToCart";
import { API } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Colors } from "../../constants/styles";

type ImgType = {
  id: number;
  name: string;
};

export type ProductTypeProps = {
  prod_id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  img_id: ImgType[]; // take only 1 for thumbnail
  route?: string;
  deleteFn?: () => any;
  sharedID?: any;
  hide?: boolean;
  ammount: number;
  RefetchCart?: () => void;
};

export default function Product({
  price,
  prod_id,
  img_id,
  route,
  title,
  hide = false,
  sharedID = "Key",
  deleteFn = () => {},
  RefetchCart,
}: ProductTypeProps) {
  const navigation = useNavigation<any>();

  const image = img_id[0]?.name
    ? `${API}/upload/images=${img_id[0]?.name}`
    : require("../../assets/notfound.png");

  function ShowMore() {
    navigation.navigate("Details", {
      prod_id,
      image,
      sharedID,
      title,
      imgPath: img_id[0]?.name,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ShowMore} activeOpacity={0.95}>
        <View style={styles.product}>
          <SharedElement
            id={`prod_id.${prod_id}${sharedID}`}
            style={styles.product}
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
                  style={[styles.button, { backgroundColor: "red" }]}
                  icon={<Ionicons name="close" size={22} color={Colors.text} />}
                />
              )}

              <AddToCart
                refetch={RefetchCart}
                prod_id={prod_id}
                style={{ right: route === "Cart" ? 70 : 10 }}
              />
            </>
          )}

          <Text style={styles.info}>${price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
