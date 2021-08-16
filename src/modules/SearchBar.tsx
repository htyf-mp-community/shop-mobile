import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useUser } from "../context/UserContext";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function SearchBar({}) {
  //@ts-ignore fix later
  const { user } = useUser();
  const [searchedValue, setSearchedValue] = useState<string>("");

  async function FindSearched() {
    const response = await fetch("", {
      method: "POST",
      body: JSON.stringify({ searched: searchedValue }),
      headers: {
        "Content-Type": "application/json",
        token: "", // user.token
      },
    });
    if (!response.ok) {
      // fail
    }
    const data = await response.json();
  }

  return (
    <View style={styles.container}>
      <Input
        value={searchedValue}
        setValue={setSearchedValue}
        placeholder={"What are you looking for?"}
        style={{ backgroundColor: "#4A4C50", width: SCREEN_WIDTH * 0.8 }}
        {...{ placeholderTextColor: "#fff" }}
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
  },
});
