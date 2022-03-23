import React from "react";
import { View, Text, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ProductTypeProps } from "../Product";
import styles from "./styles";
import { API } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../../@types/types";
import { Button } from "../../components";
import Clock from "@components/Clock";
import useCart from "modules/AddToCart/useCart";
import Ripple from "react-native-material-ripple";
import Loader from "./Loader";
import useFetch from "utils/hooks/useFetch";

export default function DailySale() {
  const { data, loading } = useFetch<ProductTypeProps>("/sales/daily", []);

  const navigation = useNavigation<useNavigationProps>();

  function toProduct() {
    if (data?.prod_id) {
      navigation.navigate("Details", {
        image: `${API}/upload/images=${data?.img_id[0]?.name}`,
        prod_id: data?.prod_id,
        sharedID: "DAILY",
        title: data?.title,
      });
    }
  }

  const { pushToCart, result } = useCart(data?.prod_id);

  return (
    <View style={styles.container}>
      {!loading && data && (
        <>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text style={styles.title}>Promotion</Text>
            <Clock />
          </View>
          <Ripple onPress={toProduct}>
            <SharedElement
              id={`prod_id.${data?.prod_id}DAILY`}
              style={styles.image_container}
            >
              <Image
                style={[styles.image]}
                resizeMode="cover"
                source={{
                  uri: `${API}/upload/images=${data?.img_id?.[0]?.name}`,
                }}
              />
            </SharedElement>
          </Ripple>
          <View style={[styles.details]}>
            <Text style={{ color: "#fff", fontSize: 20, marginBottom: 5 }}>
              {data?.title}
            </Text>
            <View
              style={[
                styles.row,
                { width: "100%", justifyContent: "space-between" },
              ]}
            >
              <View style={styles.row}>
                <Text style={styles.price}>${data?.price}</Text>
                <Text style={styles.discounted}>
                  ${Math.ceil(data?.price * 1.25)}
                </Text>
              </View>
              <Button
                onPress={() => pushToCart()}
                text={!!result ? "Added" : "Add to cart"}
                variant="ternary"
              />
            </View>
          </View>
        </>
      )}

      {loading && !data && <Loader />}
    </View>
  );
}
