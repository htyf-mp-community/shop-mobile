import { ProductImageProps, useNavigationProps } from "/@types/types";
import { API } from "constants/routes";
import { Dimensions, StyleSheet, Image } from "react-native";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { image } from "functions/image";

const { width } = Dimensions.get("window");

const WIDTH = width / 1.5;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: WIDTH,
    height: 150,
    borderRadius: 5,
  },
});

interface AuctionProps {
  images: ProductImageProps[];
  readonly auction_id: string;
  isLast?: boolean;
}

export default function Auction({ images, auction_id, isLast }: AuctionProps) {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <Ripple
      style={[styles.container, { marginRight: isLast ? 0 : 10 }]}
      onPress={() => navigation.navigate("Auction", { auction_id })}
    >
      <Image
        resizeMode="cover"
        style={styles.image}
        source={image(images[0].name)}
      />
    </Ripple>
  );
}
