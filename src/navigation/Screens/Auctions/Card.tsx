import { ProductImageProps, useNavigationProps } from "/@types/types";
import { image } from "functions/image";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors, Fonts } from "constants/styles";
import Ripple from "react-native-material-ripple";

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.primary100,
    borderRadius: 15,
    flexDirection: "row",
  },
  thumbnail: {
    width: 100 * 1.3,
    height: 75 * 1.3,
    borderRadius: 10,
  },
  side: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontFamily: Fonts.PoppinsBold,
    fontSize: 17,
  },
  text: {
    color: "#fff",
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 15,
  },
});

interface CardProps {
  navigation: useNavigationProps;
  auction_id: string;
  bids: {
    amount: number;
  }[];
  product: {
    title: string;
    category: string;
    img_id: ProductImageProps[];
  };
}

export default function Card({
  product,
  bids,
  navigation,
  auction_id,
}: CardProps) {
  return (
    <Ripple
      style={styles.container}
      onPress={() =>
        navigation.navigate("Auction", {
          auction_id,
        })
      }
    >
      <Image style={styles.thumbnail} source={image(product.img_id)} />
      <View style={styles.side}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.text}>
          Highest bid ${bids?.[0]?.amount || "No bid"}
        </Text>
      </View>
    </Ripple>
  );
}
