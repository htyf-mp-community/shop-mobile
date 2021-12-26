import { View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useUser } from "../../context/UserContext";
import { ENDPOINTS } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Colors } from "../../constants/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface SearchBarProps {
  open: (callback: () => void) => void;
  close: () => void;
  toggleSidebar: () => void;
}

export default function SearchBar({
  open,
  close,
  toggleSidebar,
}: SearchBarProps) {
  const { user } = useUser();
  const [searchedValue, setSearchedValue] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const inputRef = useRef<any>();

  function FindSearched() {
    if (searchedValue.trim() === "")
      return open(() => {
        inputRef.current.focus();
      });
    setLoading(true);
    axios
      .get(`${ENDPOINTS.searchProducts}${searchedValue}`, {
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      })
      .then(({ data }) => {
        if (data !== null && data !== undefined) {
          setLoading(false);
          close();
          setSearchedValue("");

          navigation.navigate("SearchResults", {
            result: data,
            length: data.length,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        close();
        setError(error.message);
        setSearchedValue("");
      });
  }

  return (
    <View style={styles.container}>
      <Button
        icon={<AntDesign name="bars" size={24} color={Colors.text} />}
        callback={toggleSidebar}
        style={{ marginLeft: 10, backgroundColor: Colors.primary100 }}
      />
      <Input
        value={searchedValue}
        setValue={setSearchedValue}
        placeholder={"Search the products..."}
        inputRef={inputRef}
        style={{
          backgroundColor: Colors.primary100,
          width: SCREEN_WIDTH * 0.65,
          padding: 10,
          //@ts-ignore
          fontSize: 15,
        }}
        {...{
          placeholderTextColor: Colors.text,
          onFocus: () => open(() => {}),
        }}
      />

      <Button
        callback={FindSearched}
        style={{ backgroundColor: Colors.primary100 }}
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
  },
});
