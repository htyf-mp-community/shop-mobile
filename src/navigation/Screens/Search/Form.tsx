import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { useNavigationProps } from "../../../@types/types";
import Input from "../../../components/Input/Input";
import Suggestion from "../../../components/Suggestion";
import useSearch from "./useSearch";

export default function Form() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<useNavigationProps>();

  const { setQuery, suggestion, query } = useSearch();

  return (
    <View
      style={{
        width,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#2F3135",
        marginBottom: 10,
      }}
    >
      <Input
        value={query}
        setValue={setQuery}
        placeholder="Search..."
        placeholderTextColor={"#fff"}
        style={{
          width,
          borderWidth: 2,
          borderRadius: 0,
          margin: 0,
        }}
      />
      {suggestion.map((suggestion) => (
        <Suggestion
          key={suggestion.prod_id}
          navigation={navigation}
          {...suggestion}
        />
      ))}
    </View>
  );
}
