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

import Icon from "navigation/Screens/ProductDetails/components/BottomTab/Icon";
import useWatchlist from "utils/hooks/useWatchlist";

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

  const { appendWatchlist, state, remove } = useWatchlist(data?.prod_id, {
    withCheck: true,
  });

  return (
    <View style={styles.container}>
      {!loading && data && (
        <>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text style={styles.title}>Promotion</Text>
            <Clock />
          </View>
          <Ripple onPress={toProduct} style={styles.image_container}>
            <Text style={styles.off}>20% Off</Text>
            <SharedElement id={`prod_id.${data?.prod_id}DAILY`}>
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
            <Text style={{ color: "#fff", fontSize: 20 }}>{data?.title}</Text>

            <View style={styles.bottom_tab}>
              <View
                style={[
                  styles.row,
                  { width: "100%", justifyContent: "space-between" },
                ]}
              >
                <View style={[styles.row, { width: "50%" }]}>
                  <Text style={styles.price}>${data?.price}</Text>
                  <Text style={styles.discounted}>
                    ${Math.ceil(data?.price * 1.25)}
                  </Text>
                </View>
                <Text style={{ color: "#fff" }}>12 Left</Text>
              </View>

              <View style={[styles.row, { marginTop: 10 }]}>
                <Button
                  style={styles.favourite}
                  onPress={() =>
                    state === "IN" ? remove(data?.prod_id) : appendWatchlist()
                  }
                  variant="primary"
                  icon={<Icon state={state} />}
                />
                <Button
                  style={styles.button}
                  onPress={pushToCart}
                  text={!!result ? "Added" : "Add to cart"}
                  variant={!!result ? "ternary" : "primary"}
                />
              </View>
            </View>
          </View>
        </>
      )}

      {loading && !data && <Loader />}
    </View>
  );
}
