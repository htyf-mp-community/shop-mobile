import React, { useEffect } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button } from "@components/index";
import { Colors } from "@constants/styles";
import CartIcon from "./CartIcon";
import useCart from "./useAddCart";

interface AddtoCartProps {
  prod_id: number;
  style?: StyleProp<ViewStyle>;
  relative?: boolean;
  text?: string;
  iconStyle?: StyleProp<ViewStyle & TextStyle>;
  fontStyle?: StyleProp<TextStyle>;
  disabled?: boolean;

  onRequestFinish?: () => void;
}

export default function AddToCart({
  prod_id,
  style,
  relative = false,
  text,
  iconStyle,
  fontStyle,
  disabled,
  onRequestFinish,
}: AddtoCartProps) {
  const { pushToCart, loading, error, result } = useCart(prod_id);

  const backgroundColor =
    result === "Added" ? Colors.ternary : Colors.secondary;

  async function onPress() {
    await pushToCart();
    onRequestFinish?.();
  }

  return (
    <Button
      disabled={disabled && !loading}
      text={text}
      callback={onPress}
      fontStyle={[
        {
          marginLeft: !!text ? 10 : 0,
        },
        fontStyle,
      ]}
      style={[
        {
          width: 50,
          height: 50,
          justifyContent: "center",
          backgroundColor,
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
