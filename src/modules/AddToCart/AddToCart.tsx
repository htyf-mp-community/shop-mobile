import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button } from "../../components";
import { Colors } from "../../constants/styles";
import CartIcon from "./CartIcon";
import useCart from "./useCart";

interface AddtoCartProps {
  prod_id: number;
  style?: StyleProp<ViewStyle>;
  refetch?: () => void;
  relative?: boolean;
}

/**
 * @param {Number} prod_id
 * @param {StyleProp<ViewStyle>} style styling for Component
 * @param {Function} refetch function that refreshes other component, is not compulsory
 **/

export default function AddToCart({
  prod_id,
  style,
  refetch = () => {},
  relative = false,
}: AddtoCartProps) {
  const { pushToCart, loading, error, result } = useCart(prod_id, refetch);
  return (
    <Button
      callback={pushToCart}
      style={[
        {
          width: 50,
          height: 50,
          backgroundColor:
            result === "Added" ? Colors.ternary : Colors.secondary,
        },
        !relative && { position: "absolute", bottom: 10, right: 10 },
        style,
      ]}
      icon={<CartIcon loading={loading} success={result} error={!!error} />}
    />
  );
}
