import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../../components/Button/Button";
import { Colors } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "../User/Avatar/Avatar";
import { useNavigationProps } from "../../@types/types";
import Animated from "react-native-reanimated";

import styles from "./styles";
import useColorTheme from "../../context/ThemeContext";

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

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Animated.View style={[styles.navigation, animatedButtons]}>
        <Avatar
          hide={true}
          avatarStyles={{
            backgroundColor: theme.primary100,
          }}
        />

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
    </View>
  );
}
