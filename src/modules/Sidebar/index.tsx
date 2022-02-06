import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import { Button } from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "@modules/User/Avatar/Avatar";
import { useNavigationProps } from "../../@types/types";
import Animated from "react-native-reanimated";
import styles from "./Sidebar.styles";
import useColorTheme from "@utils/context/ThemeContext";

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
          hide
          avatarStyles={{
            backgroundColor: "#131d33",
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
