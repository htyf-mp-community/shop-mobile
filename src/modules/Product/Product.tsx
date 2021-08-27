import React from "react";
import { View, Image, Text } from "react-native";
import Button from "../../components/Button/Button";
import AddToCart from "../AddToCart/AddToCart";
import { API } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

import styles from "./styles";

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
      <View style={styles.product}>
        <SharedElement
          id={`prod_id.${prod_id}${sharedID}`}
          style={styles.product}
        >
          <Image
            source={{ uri: image }}
            style={[styles.img, {}]}
            resizeMode="cover"
          />
        </SharedElement>

        {!hide && (
          <>
            {route === "Cart" ? (
              <Button
                callback={deleteFn}
                style={[styles.button, { backgroundColor: "red" }]}
                icon={<Image source={require("../../assets/close.png")} />}
              />
            ) : (
              <>
                <AddToCart prod_id={prod_id} />
              </>
            )}
          </>
        )}

        <Button
          callback={ShowMore}
          style={[styles.button, { right: hide ? 10 : 70 }]}
          icon={<Image source={require("../../assets/dots.png")} />}
        />

        <Text style={styles.info}>${price}</Text>
      </View>
    </View>
  );
}
