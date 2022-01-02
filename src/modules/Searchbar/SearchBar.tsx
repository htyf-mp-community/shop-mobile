import { View, StyleSheet, Text } from "react-native";
import React from "react";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { useNavigationProps } from "../../@types/types";

interface SearchBarProps {
  toggleSidebar: () => void;
}

export default function SearchBar({ toggleSidebar }: SearchBarProps) {
  const navigation = useNavigation<useNavigationProps>();

  return (
    <View style={styles.container}>
      <Button
        icon={<AntDesign name="bars" size={24} color={Colors.text} />}
        callback={toggleSidebar}
        style={{ margin: 5, backgroundColor: "transparent" }}
      />

      <Text style={{ fontFamily: "PoppinsBold", color: "#fff", fontSize: 18 }}>
        Welcome
      </Text>

      <Button
        callback={() => navigation.navigate("Search")}
        style={{ margin: 5, backgroundColor: "transparent" }}
        icon={<MaterialIcons name="search" size={22} color={Colors.text} />}
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
