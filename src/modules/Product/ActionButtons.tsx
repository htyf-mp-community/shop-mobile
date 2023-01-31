import { Button } from "components";
import { Feather } from "@expo/vector-icons";
import useCart from "modules/Cart/AddToCart/useAddCart";
import { Colors } from "constants/styles";
import AddWatchlist from "modules/AddWatchlist";

interface CartButtonProps {
  text: string;

  prod_id: number;
}

export const CartButton = ({ text, prod_id }: CartButtonProps) => {
  const { pushToCart: appendCart, result } = useCart(prod_id);
  return (
    <Button
      icon={
        <Feather
          style={{ marginRight: 5 }}
          name={result === "Added" ? "check" : "shopping-bag"}
          size={22}
          color={Colors.text}
        />
      }
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
      iconColor={props.iconColor}
      prod_id={props.prod_id}
      style={{
        backgroundColor: "transparent",
        margin: 0,
        marginRight: 5,
        borderRightWidth: 1,
        borderRightColor: "rgba(255,255,255,0.5)",
        borderRadius: 0,
      }}
    />
  );
};
