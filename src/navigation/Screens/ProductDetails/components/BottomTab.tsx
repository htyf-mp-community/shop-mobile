import AddToCart from "modules/Cart/AddToCart/AddToCart";
import useColorTheme from "utils/context/ThemeContext";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import styles from "../styles";
import AddWatchlist from "modules/AddWatchlist";
import { ToastAndroid } from "react-native";
import { Colors } from "constants/styles";
import Color from "color";

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
      entering={FadeInDown.delay(150)}
    >
      <AddWatchlist prod_id={prod_id} paddingHorizontal={20} />

      <AddToCart
        onRequestFinish={
          notAvailable
            ? () => ToastAndroid.show("Unavailable", ToastAndroid.SHORT)
            : onCartUpdate
        }
        relative
        prod_id={prod_id}
        fontStyle={{
          textTransform: "uppercase",
          fontSize: 16,
        }}
        text={notAvailable ? "Not Available" : "Add product"}
        style={[styles.button, { backgroundColor: Colors.secondary }]}
      />
    </Animated.View>
  );
}
