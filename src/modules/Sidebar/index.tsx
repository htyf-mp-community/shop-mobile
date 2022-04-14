import React from "react";
import Avatar from "@modules/User/Avatar/Avatar";
import Animated from "react-native-reanimated";
import styles from "./Sidebar.styles";
import useColorTheme from "@utils/context/ThemeContext";
import { SafeAreaView } from "react-native";
import NavigationButtons from "./navigation_buttons";

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
  const { theme } = useColorTheme();

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

        <NavigationButtons />
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
