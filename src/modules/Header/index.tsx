import { View, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigationProps } from "../../@types/types";
import useColorTheme from "@utils/context/ThemeContext";
import { Button } from "components";

interface SearchBarProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar: onToggle }: SearchBarProps) {
  const navigation = useNavigation<useNavigationProps>();
  const { theme } = useColorTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Button
        onPress={onToggle}
        icon={<EvilIcons name="navicon" size={30} color={theme.text} />}
        style={{ marginLeft: 10, padding: 5 }}
      />

      <Button
        icon={<EvilIcons name="search" size={25} color={theme.text} />}
        onPress={() => navigation.navigate("Search")}
        style={{ marginRight: 10, padding: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    padding: 10,
    justifyContent: "space-between",
  },
});
