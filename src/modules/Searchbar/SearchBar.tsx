import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useUser } from "../../context/UserContext";
import { API, ENDPOINTS } from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Colors } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface SearchBarProps {
  open: (callback?: any) => void;
  close: () => void;
}

export default function SearchBar({ open, close }: SearchBarProps) {
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
        icon={
          <MaterialIcons name="shopping-basket" size={24} color={Colors.text} />
        }
        callback={() => navigation.navigate("Cart")}
        style={{ marginLeft: 10, backgroundColor: Colors.primary100 }}
      />
      <Input
        value={searchedValue}
        setValue={setSearchedValue}
        placeholder={"What are you looking for?"}
        inputRef={inputRef}
        style={{
          backgroundColor: Colors.primary100,
          color: Colors.text,
          width: SCREEN_WIDTH * 0.65,
        }}
        {...{
          placeholderTextColor: Colors.text,
          onFocus: () => open(() => {}),
        }}
      />

      <Button
        callback={FindSearched}
        style={{ backgroundColor: Colors.primary100 }}
        icon={
          <>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <MaterialIcons name="search" size={22} color={Colors.text} />
            )}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    zIndex: 10,
  },
});
