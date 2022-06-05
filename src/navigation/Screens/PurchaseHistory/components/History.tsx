import { View, StyleSheet, Text, Image } from "react-native";
import { API } from "constants/routes";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";
import { IHistory } from "../hooks/usePurchaseHistory";
import { image } from "functions/image";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    flexDirection: "row",
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

interface HistoryProps extends IHistory {
  separator: boolean;
}

export default function History({
  prod_id: product,
  date,
  separator,
}: HistoryProps) {
  const navigation = useNavigation<useNavigationProps>();

  function onPushRoute(item: any) {
    navigation.push("Details", {
      image: `${API}/upload/images=${item.product.img_id[0].name}`,
      prod_id: item.product.prod_id,
      sharedID: "",
      title: item.product.title,
    });
  }

  return (
    <View style={[styles.container, { marginBottom: separator ? 30 : 0 }]}>
      <Image source={image(product.img_id[0].name)} style={styles.image} />

      <View style={{ paddingLeft: 10 }}>
        <Text style={{ color: "#fff" }}>{product.title}</Text>
        <Text style={{ color: "#fff" }}>${product.price}</Text>
        <Text style={{ color: "#fff" }}>
          {new Date(+date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
