import AddToCart from "modules/Cart/AddToCart/AddToCart";
import useColorTheme from "utils/context/ThemeContext";
import Animated, { ZoomIn } from "react-native-reanimated";
import styles from "../../styles";
import AddWatchlist from "modules/AddWatchlist";

interface BottomTabProps {
  prod_id: number;
  quantity: number;

  onCartUpdate: () => void;
}

export default function BottomTab({
  prod_id,
  quantity,
  onCartUpdate,
}: BottomTabProps) {
  const { theme } = useColorTheme();

  const notAvailable = quantity === 0;

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
        onRequestFinish={onCartUpdate}
        disabled={notAvailable}
        relative
        prod_id={prod_id}
        text={notAvailable ? "Not Available" : "Add to Cart"}
        style={[styles.button]}
      />
    </Animated.View>
  );
}
