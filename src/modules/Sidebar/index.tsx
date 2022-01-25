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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.navigation, animatedButtons]}>
        <Avatar
          hide={true}
          avatarStyles={{ backgroundColor: Colors.primary100 }}
        />
        {[
          { text: "Cart", icon: "shoppingcart" },
          { text: "User", icon: "user" },
        ].map(({ text, icon }, i) => {
          return (
            <Button
              key={i}
              icon={
                <AntDesign
                  //@ts-ignore
                  name={icon}
                  style={{ marginRight: 10 }}
                  size={30}
                  color={Colors.text}
                />
              }
              style={styles.button}
              text={text}
              onPress={() => navigation.navigate(text as any)}
            />
          );
        })}
      </Animated.View>

      <Animated.View style={[styles.sidebar, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}
