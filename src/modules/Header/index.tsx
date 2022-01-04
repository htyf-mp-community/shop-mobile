import { View, StyleSheet } from "react-native";
import React from "react";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigationProps } from "../../@types/types";

interface SearchBarProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: SearchBarProps) {
  const navigation = useNavigation<useNavigationProps>();

  return (
    <View style={styles.container}>
      <Button
        icon={<EvilIcons name="navicon" size={30} color="white" />}
        callback={toggleSidebar}
        style={{ margin: 5, backgroundColor: "transparent" }}
      />

      <Button
        callback={() => navigation.navigate("Search")}
        style={{ margin: 5, backgroundColor: "transparent" }}
        icon={<MaterialIcons name="search" size={25} color={Colors.text} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    justifyContent: "space-between",
  },
});
