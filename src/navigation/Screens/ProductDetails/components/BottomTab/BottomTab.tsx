import AddToCart from "modules/AddToCart/AddToCart";
import useColorTheme from "utils/context/ThemeContext";
import Animated, { ZoomIn } from "react-native-reanimated";
import styles from "../../styles";
import { Button } from "components";
import { AntDesign } from "@expo/vector-icons";
import useWatchlist from "../../hooks/useWatchlist";

interface BottomTabProps {
  prod_id: number;
  quantity: number;
}

export default function BottomTab({ prod_id, quantity }: BottomTabProps) {
  const { theme } = useColorTheme();

  const { appendWatchlist, state } = useWatchlist(prod_id, { withCheck: true });

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { backgroundColor: theme.primary, flexDirection: "row" },
      ]}
      entering={ZoomIn.duration(200)}
    >
      {state !== "IN" && (
        <Button
          onPress={appendWatchlist}
          disabled={state === "ADDED"}
          variant="primary"
          style={[styles.favButton]}
          icon={<AntDesign name="hearto" size={26} color="white" />}
        />
      )}

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
