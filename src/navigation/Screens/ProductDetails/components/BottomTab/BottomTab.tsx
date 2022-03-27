import AddToCart from "modules/AddToCart/AddToCart";
import useColorTheme from "utils/context/ThemeContext";
import Animated, { ZoomIn } from "react-native-reanimated";
import styles from "../../styles";
import { Button } from "components";
import { AntDesign } from "@expo/vector-icons";
import useWatchlist from "@utils/hooks/useWatchlist";
import Icon from "./Icon";

interface BottomTabProps {
  prod_id: number;
  quantity: number;
}

export default function BottomTab({ prod_id, quantity }: BottomTabProps) {
  const { theme } = useColorTheme();
  const { appendWatchlist, state, remove } = useWatchlist(prod_id, {
    withCheck: true,
  });

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { backgroundColor: theme.primary, flexDirection: "row" },
      ]}
      entering={ZoomIn.duration(200)}
    >
      <Button
        onPress={() => (state === "IN" ? remove(prod_id) : appendWatchlist())}
        variant="primary"
        style={[styles.favButton]}
        icon={<Icon state={state} />}
      />

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
