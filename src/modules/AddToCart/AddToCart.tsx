import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button } from "@components/index";
import { Colors } from "@constants/styles";
import CartIcon from "./CartIcon";
import useCart from "./useCart";
import { notUndefined } from "@functions/typecheckers";

interface AddtoCartProps {
  prod_id: number;
  style?: StyleProp<ViewStyle>;
  refetch?: () => void;
  relative?: boolean;
  text?: string;
  iconStyle?: StyleProp<ViewStyle & TextStyle>;
  fontStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export default function AddToCart({
  prod_id,
  style,
  refetch = () => {},
  relative = false,
  text,
  iconStyle,
  fontStyle,

  disabled,
}: AddtoCartProps) {
  const { pushToCart, loading, error, result } = useCart(prod_id, refetch);

  return (
    <Button
      disabled={disabled && !loading}
      text={text}
      callback={pushToCart}
      fontStyle={[
        {
          marginLeft: notUndefined(text) ? 10 : 0,
        },
        fontStyle,
      ]}
      style={[
        {
          width: 50,
          height: 50,
          justifyContent: "center",
          backgroundColor:
            result === "Added" ? Colors.ternary : Colors.secondary,
        },
        !relative && { position: "absolute", bottom: 10, right: 10 },
        style,
      ]}
      icon={
        <CartIcon
          style={iconStyle}
          loading={loading}
          success={result}
          error={!!error}
        />
      }
    />
  );
}
