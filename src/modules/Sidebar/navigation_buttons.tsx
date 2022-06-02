import { View } from "react-native";
import { Button } from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "utils/hooks/hooks";
import { useNavigationProps } from "../../@types/types";
import { useNavigation } from "@react-navigation/core";
import styles from "./Sidebar.styles";

export default function NavigationButtons() {
  const { cart, watchlist } = useAppSelector((state) => state);
  const navigation = useNavigation<useNavigationProps>();

  return (
    <>
      <View style={{ flex: 1 }}>
        <Button
          badge={watchlist.amount}
          icon={
            <AntDesign
              name={"heart"}
              style={{ marginRight: 10 }}
              size={25}
              color={"red"}
            />
          }
          style={[styles.button]}
          fontStyle={{ color: "#fff" }}
          text={"Watchlist"}
          onPress={() => navigation.navigate("Watchlist")}
        />

        <Button
          badge={cart.amount}
          icon={
            <AntDesign
              name={"shoppingcart"}
              style={{ marginRight: 10 }}
              size={30}
              color={"#fff"}
            />
          }
          style={[styles.button]}
          fontStyle={{ color: "#fff" }}
          text={"Cart"}
          onPress={() => navigation.navigate("Cart")}
        />

        <Button
          icon={
            <AntDesign
              name={"user"}
              style={{ marginRight: 10 }}
              size={30}
              color={"#fff"}
            />
          }
          style={[styles.button]}
          fontStyle={{ color: "#fff" }}
          text={"User"}
          onPress={() => navigation.navigate("User")}
        />
      </View>

      <Button
        style={[styles.button]}
        text="Sell products"
        onPress={() => navigation.navigate("Upload")}
      />
    </>
  );
}
