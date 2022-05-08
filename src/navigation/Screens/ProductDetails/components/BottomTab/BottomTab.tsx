import AddToCart from "modules/AddToCart/AddToCart";
import useColorTheme from "utils/context/ThemeContext";
import Animated, { ZoomIn } from "react-native-reanimated";
import styles from "../../styles";
import AddWatchlist from "modules/AddWatchlist";

interface BottomTabProps {
  prod_id: number;
  quantity: number;
}

export default function BottomTab({ prod_id, quantity }: BottomTabProps) {
  const { theme } = useColorTheme();

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { backgroundColor: theme.primary, flexDirection: "row" },
      ]}
      entering={ZoomIn.duration(200)}
    >
      <AddWatchlist prod_id={prod_id} paddingHorizontal={20} />

      <AddToCart
        disabled={quantity === 0}
        relative
        prod_id={prod_id}
        text="ADD TO CART"
        style={[
          styles.button,
          {
            backgroundColor: quantity === 0 ? theme.primary : "#1e3a8a",
          },
        ]}
      />
    </Animated.View>
  );
}
