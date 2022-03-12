import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import { API } from "constants/routes";
import { OutputProps } from "../structure";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";

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
});

function getTotal(products: OutputProps[]): number {
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total += +products[i].product.price;
  }

  return total;
}

export default function History({ products }: PurchaseProps) {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={({ details }) => details.purchase_id.toString()}
        renderItem={({ item }) => {
          return (
            <Ripple
              onPress={() =>
                navigation.push("Details", {
                  image: `${API}/upload/images=${item.product.img_id[0].name}`,
                  prod_id: item.product.prod_id,
                  sharedID: "",
                  title: item.product.title,
                })
              }
              rippleColor="#000"
              style={{ padding: 5, flexDirection: "row" }}
            >
              <Image
                //resizeMode="contain"
                style={{ width: 100, height: 70, borderRadius: 2.5 }}
                source={{
                  uri: `${API}/upload/images=${item.product.img_id[0].name}`,
                }}
              />
              <View style={{ flexDirection: "column", padding: 5 }}>
                <Text style={{ color: "#fff" }}>{item.product.title}</Text>
                <Text style={{ color: "#fff" }}>Amount: {2}</Text>
                <Text style={{ color: "#fff" }}>
                  Price: ${item.product.price}
                </Text>
              </View>
            </Ripple>
          );
        }}
      />

      <View style={styles.details}>
        <Text
          style={{
            color: "#fff",
            fontFamily: "PoppinsBold",
            fontSize: 20,
          }}
        >
          {products[0].details.date}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontFamily: "PoppinsBold",
            fontSize: 20,
          }}
        >
          Total: ${getTotal(products)}
        </Text>
      </View>
    </View>
  );
}
