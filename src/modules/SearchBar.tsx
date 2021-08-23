import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useUser } from "../context/UserContext";
import { API } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Colors } from "../constants/styles";

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

  function FindSearched() {
    if (searchedValue.trim() === "") return;
    setLoading(true);
    axios
      .get(`${API}/products/searched=${searchedValue}`, {
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
          setData(data);
        }
      })
      .catch((error) => {
        setLoading(false);
        close();
        setError(error.message);
        setSearchedValue("");
      });
  }

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Button
        icon={<Image source={require("../assets/basket.png")} />}
        callback={() => navigation.navigate("Cart")}
        style={{ marginLeft: 10 }}
      />
      <Input
        value={searchedValue}
        setValue={setSearchedValue}
        placeholder={"What are you looking for?"}
        style={{
          backgroundColor: "#4A4C50",
          color: Colors.text,
          width: SCREEN_WIDTH * 0.65,
        }}
        {...{
          placeholderTextColor: Colors.text,
          onFocus: () => open(),
        }}
      />

      <Button
        callback={FindSearched}
        icon={
          <Image
            source={
              loading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                require("../assets/search.png")
              )
            }
          />
        }
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
