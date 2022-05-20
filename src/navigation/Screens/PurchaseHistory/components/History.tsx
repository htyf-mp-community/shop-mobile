import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import { API } from "constants/routes";
import { OutputProps } from "../structure";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";
import { image } from "functions/image";

interface PurchaseProps {
  products: OutputProps[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 15,
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
});

const calcTotal = (products: OutputProps[]) =>
  products.reduce((prev, curr) => prev + curr.product.price, 0);

export default function History({ products }: PurchaseProps) {
  const navigation = useNavigation<useNavigationProps>();

  function onPushRoute(item: OutputProps) {
    navigation.push("Details", {
      image: `${API}/upload/images=${item.product.img_id[0].name}`,
      prod_id: item.product.prod_id,
      sharedID: "",
      title: item.product.title,
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={({ details }) => details.purchase_id.toString()}
        renderItem={({ item }) => {
          return (
            <Ripple
              onPress={() => onPushRoute(item)}
              rippleColor="#000"
              style={{ padding: 5, flexDirection: "row" }}
            >
              <Image
                style={{ width: 100, height: 70, borderRadius: 2.5 }}
                source={image(item.product.img_id[0].name)}
              />
              <View style={{ flexDirection: "column", padding: 5 }}>
                <Text style={{ color: "#fff" }}>{item.product.title}</Text>
                <Text style={{ color: "#fff" }}>Amount: 1</Text>
                <Text style={{ color: "#fff" }}>
                  Price: ${item.product.price}
                </Text>
              </View>
            </Ripple>
          );
        }}
      />

      <View style={styles.details}>
        <Text style={styles.text}>
          {new Date(+products[0].details.date).toDateString()}
        </Text>
        <Text style={styles.text}>Total: ${calcTotal(products)}</Text>
      </View>
    </View>
  );
}
