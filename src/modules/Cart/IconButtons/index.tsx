import { IconButton } from "components";
import useRemoveCart from "navigation/Screens/Cart/hooks/useRemoveCart";
import { Entypo } from "@expo/vector-icons";
import useAddCart from "@modules/Cart/AddToCart/useAddCart";

export const CartRemoveIconButton = ({
  cart_id,
  isDisabled: isButtonDisabled = false,
}: {
  cart_id: number;
  isDisabled?: boolean;
}) => {
  const { remove, loading: loadingRemove } = useRemoveCart();

  const isDisabled = loadingRemove || isButtonDisabled;

  return (
    <IconButton
      disabled={isDisabled}
      onPress={() => remove(cart_id!)}
      icon={<Entypo color="white" name="minus" />}
    />
  );
};

export const CartAddIconButton = ({ prod_id }: { prod_id: number }) => {
  const { pushToCart: addToCart, loading: loadingAdd } = useAddCart(prod_id);

  return (
    <IconButton
      disabled={loadingAdd}
      onPress={() => addToCart()}
      icon={<Entypo color="white" name="plus" />}
    />
  );
};
