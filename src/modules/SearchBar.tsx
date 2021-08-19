import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useUser } from "../context/UserContext";
import { API } from "../constants/routes";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface SearchBarProps {
  open: () => void;
  close: () => void;
  setData: (props: any) => void;
}

export default function SearchBar({ open, close, setData }: SearchBarProps) {
  const { user } = useUser();
  const [searchedValue, setSearchedValue] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function FindSearched() {
    try {
      const response = await fetch(
        API + "/products/searched=" + searchedValue,
        {
          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },
        }
      );
      if (!response.ok) {
      }
      const data = await response.json();
      if (data !== null) {
        setLoading(false);
        close();
        setSearchedValue("");
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      close();
      setError(error.message);
      setSearchedValue("");
    }
  }

  return (
    <View style={styles.container}>
      <Input
        value={searchedValue}
        setValue={setSearchedValue}
        placeholder={"What are you looking for?"}
        style={{
          backgroundColor: "#4A4C50",
          color: "white",
          width: SCREEN_WIDTH * 0.8,
        }}
        {...{
          placeholderTextColor: "#fff",
          onFocus: () => open(),
        }}
      />

      <Button
        callback={FindSearched}
        icon={<Image source={require("../assets/search.png")} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#313131",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    borderBottomColor: "#000",
    zIndex: 10,
  },
});
