import { View, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigationProps } from "../../@types/types";
import useColorTheme from "@utils/context/ThemeContext";
import { PulseButton } from "components";

interface SearchBarProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: SearchBarProps) {
  const navigation = useNavigation<useNavigationProps>();
  const { theme } = useColorTheme();
  const pulseColor = "rgba(255,255,255,0.1)";

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <PulseButton
        onPress={toggleSidebar}
        icon={<EvilIcons name="navicon" size={30} color={theme.text} />}
        styles={{ marginLeft: 10 }}
        pulseColor={pulseColor}
      />

      <PulseButton
        icon={<MaterialIcons name="search" size={25} color={theme.text} />}
        onPress={() => navigation.navigate("Search")}
        styles={{ marginRight: 10 }}
        pulseColor={pulseColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 10,
  },
});
