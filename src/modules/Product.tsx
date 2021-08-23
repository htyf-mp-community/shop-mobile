import React from "react";
import { View, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, radius } from "../constants/styles";
import Button from "../components/Button/Button";
import AddToCart from "./AddToCart/AddToCart";
import { API } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

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
    : require("../assets/notfound.png");

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
                icon={<Image source={require("../assets/close.png")} />}
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
          icon={<Image source={require("../assets/dots.png")} />}
        />

        <Text style={styles.info}>${price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  product: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT / 3.5,
    position: "relative",
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.small,
  },

  text: {
    color: Colors.secondary,
    marginLeft: 10,
  },
  button: {
    color: Colors.text,
    width: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.secondary,
  },
  info: {
    backgroundColor: Colors.secondary,
    color: Colors.text,
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
  },
});
