import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useUser } from "../context/UserContext";
import { API } from "../constants/routes";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function SearchBar({}) {
  const { user } = useUser();
  const [searchedValue, setSearchedValue] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function FindSearched() {
    try {
      const response = await fetch(API + "/", {
        method: "GET",
        body: JSON.stringify({ searched: searchedValue }),
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      });
      if (!response.ok) {
      }
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
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
    borderBottomColor: "#000",
  },
});
