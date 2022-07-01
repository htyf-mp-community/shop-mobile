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

  const notAvailable = quantity === 0;

  const backgroundColor = notAvailable ? theme.primary : "#1e3a8a";

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
        disabled={notAvailable}
        relative
        prod_id={prod_id}
        text={notAvailable ? "Not Available" : "Add to Cart"}
        style={[
          styles.button,
          {
            backgroundColor,
          },
        ]}
      />
    </Animated.View>
  );
}
