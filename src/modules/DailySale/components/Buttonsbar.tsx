import { View } from "react-native";
import styles from "../styles";
import AddWatchlist from "modules/AddWatchlist";
import { Button } from "components";
import useCart from "modules/Cart/AddToCart/useAddCart";
import { Cart } from "redux/Cart";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";

export default function ButtonsBar(props: { product?: Cart; prod_id: number }) {
  const { pushToCart: addCart, result } = useCart(props.prod_id || 0);

  const navigation = useNavigation<useNavigationProps>();

  return (
    <View style={[styles.row, { marginTop: 10, zIndex: 5 }]}>
      <AddWatchlist prod_id={props.prod_id} />
      <Button
        onLongPress={() => navigation.navigate("Cart")}
        fontStyle={{ textTransform: "uppercase" }}
        style={styles.button}
        callback={addCart}
        text={
          !!result ? `product added (${props.product?.ammount})` : "add to cart"
        }
        color="primary"
        type="contained"
      />
    </View>
  );
}
