import {
  CartAddIconButton,
  CartRemoveIconButton,
} from "modules/Cart/IconButtons";
import { View } from "react-native";
import { Text } from "react-native";

export default function QuantityButtons(props: {
  productQuantity: number;
  productCartQuantity: number;
  cart_id: number;
  prod_id: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 17 }}>Amount</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <CartRemoveIconButton cart_id={props.cart_id} />
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            padding: 10,
          }}
        >
          {props.productCartQuantity}
        </Text>
        <CartAddIconButton
          isDisabled={
            (props.productCartQuantity || 0) > (props.productQuantity || 0)
          }
          prod_id={props.prod_id}
        />
      </View>
    </View>
  );
}
