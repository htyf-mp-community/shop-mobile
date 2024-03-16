import { Button } from "components";
import { Feather } from "@expo/vector-icons";
import useCart from "modules/Cart/AddToCart/useAddCart";
import { Colors } from "constants/styles";
import AddWatchlist from "modules/AddWatchlist";
import { useNavigation } from "@react-navigation/native";

interface CartButtonProps {
  text: string;

  prod_id: number;
}

export const CartButton = ({ text, prod_id }: CartButtonProps) => {
  const { pushToCart: appendCart, result, loading } = useCart(prod_id);

  const navigation = useNavigation<any>();

  return (
    <Button
      onLongPress={() => navigation.navigate("Cart")}
      disabled={loading}
      icon={
        <Feather
          style={{ marginRight: 5 }}
          name={result === "Added" ? "check" : "shopping-bag"}
          size={18}
          color={Colors.text}
        />
      }
      fontStyle={{ fontSize: 18 }}
      callback={appendCart}
      variant="primary"
      type="contained"
      text={text}
      style={{
        flexDirection: "row-reverse",
        backgroundColor: Colors.primary,
      }}
    />
  );
};

interface WatchlistButtonProps {
  prod_id: number;

  iconColor?: string;
}

export const WatchlistButton = (props: WatchlistButtonProps) => {
  return (
    <AddWatchlist
      iconColor={Colors.secondary}
      prod_id={props.prod_id}
      iconSize={20}
      style={{
        backgroundColor: "transparent",
        margin: 0,
        marginRight: 5,
        borderRightWidth: 1,
        borderRightColor: "rgba(255,255,255,0.3)",
        borderRadius: 0,
      }}
    />
  );
};
