import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button } from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "@modules/User/Avatar/Avatar";
import { useNavigationProps } from "../../@types/types";
import Animated from "react-native-reanimated";
import styles from "./Sidebar.styles";
import useColorTheme from "@utils/context/ThemeContext";
import { useAppSelector } from "utils/hooks/hooks";
import { SafeAreaView, View } from "react-native";
import Badge from "components/Badge";

interface SidebarProps {
  children: React.ReactNode;
  animatedStyle: Animated.AnimateStyle<any>;
  animatedButtons: Animated.AnimateStyle<any>;
}

export default function Sidebar({
  children,
  animatedStyle,
  animatedButtons,
}: SidebarProps) {
  const navigation = useNavigation<useNavigationProps>();
  const { theme } = useColorTheme();

  const { cart, watchlist } = useAppSelector((state) => state);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.primary, flex: 1 }]}
    >
      <Animated.View style={[styles.navigation, animatedButtons]}>
        <Avatar
          hide
          avatarStyles={{
            backgroundColor: "#131d33",
          }}
        />

        <View style={{ position: "relative" }}>
          {watchlist.amount > 0 && <Badge amount={watchlist.amount} />}
          <Button
            icon={
              <AntDesign
                name={"heart"}
                style={{ marginRight: 10 }}
                size={25}
                color={"red"}
              />
            }
            style={[styles.button]}
            fontStyle={{ color: theme.text }}
            text={"Watchlist"}
            onPress={() => navigation.navigate("Watchlist")}
          />
        </View>

        <View style={{ position: "relative" }}>
          {cart.amount > 0 && <Badge amount={cart.amount} />}
          <Button
            icon={
              <AntDesign
                name={"shoppingcart"}
                style={{ marginRight: 10 }}
                size={30}
                color={theme.text}
              />
            }
            style={[styles.button]}
            fontStyle={{ color: theme.text }}
            text={"Cart"}
            onPress={() => navigation.navigate("Cart")}
          />
        </View>

        <Button
          icon={
            <AntDesign
              name={"user"}
              style={{ marginRight: 10 }}
              size={30}
              color={theme.text}
            />
          }
          style={[styles.button]}
          fontStyle={{ color: theme.text }}
          text={"User"}
          onPress={() => navigation.navigate("User")}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.sidebar,
          animatedStyle,
          { backgroundColor: theme.primary },
        ]}
      >
        {children}
      </Animated.View>
    </SafeAreaView>
  );
}
