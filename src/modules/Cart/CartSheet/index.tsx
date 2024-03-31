import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { Text, View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import type { Product } from "/@types/types";
import styles from "./styles";
import Preview from "./components/Preview";
import Navigators from "./components/Navigators";
import { Cart } from "redux/Cart";
import QuantityButtons from "./components/QuantityButtons";

interface CartSheetProps {
  product: Partial<Product>;
  onDismiss: () => void;

  cartProduct: Cart | undefined;
}

const CartSheet = forwardRef<BottomSheet, CartSheetProps>(
  ({ product, onDismiss, cartProduct }, ref) => {
    const { theme } = useColorTheme();

    const backdropComponent = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={["50%"]}
        backgroundStyle={{ backgroundColor: theme.primary }}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: "#fff", width: "20%" }}
        backdropComponent={backdropComponent}
      >
        <View style={styles.container}>
          {cartProduct && (
            <View>
              <Text style={styles.title}>In cart!</Text>

              <Preview product={product} />

              <QuantityButtons
                cart_id={cartProduct?.cart_id || 0}
                prod_id={cartProduct?.prod_id || 0}
                productQuantity={product.quantity || 0}
                productCartQuantity={cartProduct?.ammount || 0}
              />
            </View>
          )}
          <View style={styles.navigation_container}>
            <Navigators
              prod_id={cartProduct?.prod_id || 0}
              onDismiss={onDismiss}
            />
          </View>
        </View>
      </BottomSheet>
    );
  }
);

export default CartSheet;
