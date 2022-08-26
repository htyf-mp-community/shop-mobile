import { View, StyleSheet, Text, Image } from "react-native";
import { API } from "constants/routes";
import { useNavigation } from "@react-navigation/native";
import { Product, useNavigationProps } from "/@types/types";
import { IHistory } from "../hooks/usePurchaseHistory";
import { image } from "functions/image";
import { h2 } from "constants/styles";
import Ripple from "react-native-material-ripple";
import layout from "constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    flexDirection: "column",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
});

export default function History({ products, date, total_price }: IHistory) {
  const navigation = useNavigation<useNavigationProps>();

  function onPushRoute(product: Product) {
    navigation.push("Details", {
      image: `${API}/upload/images=${product.img_id[0].name}`,
      prod_id: product.prod_id,
      sharedID: "",
      title: product.title,
    });
  }

  return (
    <View style={[styles.container, { marginBottom: 20 }]}>
      {products?.map((arg) => {
        const product = arg.prod_id as Product;
        return (
          <Ripple
            onPress={() => onPushRoute(product)}
            key={arg.history_id}
            style={{
              flexDirection: "row",
              marginBottom: 10,
              width: layout.screen.width - 20,
              overflow: "hidden",
            }}
          >
            <Image
              source={image(product.img_id[0].name)}
              style={styles.image}
            />

            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{ color: "#fff" }}
                numberOfLines={2}
                textBreakStrategy="simple"
              >
                {product.title}
              </Text>
              <Text style={{ color: "#fff" }}>${product.price}</Text>
              <Text style={{ color: "#fff" }}>
                {new Date(+date!).toLocaleDateString()}
              </Text>
            </View>
          </Ripple>
        );
      })}

      <Text style={[h2, { fontSize: 20, lineHeight: 30 }]}>
        Total: ${total_price}
      </Text>
    </View>
  );
}
