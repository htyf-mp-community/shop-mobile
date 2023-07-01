import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { Text, View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import type { Product } from "/@types/types";
import { CartAddIconButton, CartRemoveIconButton } from "../IconButtons";
import styles from "./styles";
import Preview from "./components/Preview";
import Navigators from "./components/Navigators";
import { Cart } from "redux/Cart";

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
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        // backdropComponent={backdropComponent}
      >
        <View style={styles.container}>
          {cartProduct && (
            <View>
              <Text style={styles.title}>Product added to cart</Text>

              <Preview product={product} />

              <View style={styles.buttons_container}>
                <Text style={{ color: "#fff", fontSize: 17 }}>
                  Modify amount
                </Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <CartRemoveIconButton
                    isDisabled={cartProduct.ammount === 1}
                    cart_id={cartProduct?.cart_id}
                  />
                  <Text style={styles.amount_text}>{cartProduct?.ammount}</Text>
                  <CartAddIconButton
                    isDisabled={
                      (cartProduct?.ammount || 0) > (product?.quantity || 0)
                    }
                    prod_id={cartProduct?.prod_id}
                  />
                </View>
              </View>
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
