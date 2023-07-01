import { Button } from "components";
import { useNavigation } from "@react-navigation/native";
import type { useNavigationProps } from "/@types/types";

export default function Navigators({
  onDismiss,
  prod_id,
}: {
  onDismiss?: () => void;
  prod_id: number;
}) {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <>
      <Button text="Go back" style={{ width: "25%" }} onPress={onDismiss} />
      <Button
        onPress={() =>
          navigation.navigate("Cart", {
            scrollToProductOnOpen: true,
            selectedProductId: prod_id,
          })
        }
        style={{ width: "70%", borderRadius: 100 }}
        text="Go to cart"
        type="contained"
        size="xl"
        color="primary"
      />
    </>
  );
}
