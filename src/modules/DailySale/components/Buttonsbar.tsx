import { View } from "react-native";
import styles from "../styles";
import AddWatchlist from "modules/AddWatchlist";
import { Button } from "components";
import useCart from "modules/Cart/AddToCart/useAddCart";
import { Cart } from "redux/Cart";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";

export default function ButtonsBar(props: { product?: Cart; prod_id: number }) {
  const { pushToCart: addCart, result, loading } = useCart(props.prod_id || 0);

  const navigation = useNavigation<any>();

  return (
    <View
      style={[styles.row, { marginTop: 10, zIndex: 5, alignItems: "stretch" }]}
    >
      <AddWatchlist prod_id={props.prod_id} />
      <Button
        disabled={loading}
        onLongPress={() => navigation.navigate("Cart")}
        fontStyle={{ textTransform: "uppercase", fontSize: 17 }}
        style={styles.button}
        callback={addCart}
        text={
          !!result ? `Product added (${props.product?.ammount})` : "Add to cart"
        }
        color="primary"
        type="contained"
      />
    </View>
  );
}
