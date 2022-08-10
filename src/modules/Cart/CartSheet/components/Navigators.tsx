import { Button } from "components";
import { useNavigation } from "@react-navigation/native";
import type { useNavigationProps } from "/@types/types";

export default function Navigators({ onDismiss }: { onDismiss?: () => void }) {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <>
      <Button text="Go back" style={{ width: "25%" }} onPress={onDismiss} />
      <Button
        onPress={() => navigation.navigate("Cart")}
        style={{ width: "70%" }}
        text="Go to cart"
        type="contained"
        size="xl"
        color="primary"
      />
    </>
  );
}
