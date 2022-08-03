import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Button } from "components";
import { Fonts } from "constants/styles";
import { image } from "functions/image";
import { forwardRef, useCallback, useEffect } from "react";
import { Image, Text, View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import type { Product, useNavigationProps } from "/@types/types";

interface CartSheetProps {
  product?: Product;
  onDismiss?: () => void;
}

const CartSheet = forwardRef<BottomSheet, CartSheetProps>(
  ({ product, onDismiss }, ref) => {
    const { theme } = useColorTheme();

    const navigation = useNavigation<useNavigationProps>();

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
        {!!product?.prod_id && (
          <View
            style={{ flex: 1, padding: 10, justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontFamily: Fonts.PoppinsBold,
                }}
              >
                Product added to cart
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={image(product?.img_id || undefined)}
                  style={{ width: 100, height: 100 }}
                  // resizeMode="contain"
                />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontFamily: Fonts.PoppinsMedium,
                    }}
                  >
                    {product?.title}
                  </Text>
                  <Text style={{ color: "#fff" }}>${product?.price}</Text>
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                text="Go back"
                style={{ width: "25%" }}
                onPress={onDismiss}
              />
              <Button
                onPress={() => navigation.navigate("Cart")}
                style={{ width: "70%" }}
                text="Go to cart"
                type="contained"
                size="xl"
                color="primary"
              />
            </View>
          </View>
        )}
      </BottomSheet>
    );
  }
);

export default CartSheet;
