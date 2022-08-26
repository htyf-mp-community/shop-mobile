import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { Text, View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import type { Product } from "/@types/types";
import { useAppSelector } from "@utils/hooks/hooks";
import { CartAddIconButton, CartRemoveIconButton } from "../IconButtons";
import styles from "./styles";
import Preview from "./components/Preview";
import Navigators from "./components/Navigators";

interface CartSheetProps {
  product: Partial<Omit<Product, "prod_id">> & Pick<Product, "prod_id">;
  onDismiss: () => void;
}

const CartSheet = forwardRef<BottomSheet, CartSheetProps>(
  ({ product, onDismiss }, ref) => {
    const { theme } = useColorTheme();

    const backdropComponent = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    const { cart } = useAppSelector((state) => state.cart);

    const cartProduct = cart.find((item) => item.prod_id === product.prod_id);

    return (
      <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={["65%"]}
        backgroundStyle={{ backgroundColor: theme.primary }}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backdropComponent={backdropComponent}
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
            <Navigators onDismiss={onDismiss} />
          </View>
        </View>
      </BottomSheet>
    );
  }
);

export default CartSheet;
