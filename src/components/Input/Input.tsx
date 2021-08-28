import { View, TextInput, Text } from "react-native";
import styles from "./styles";
import React from "react";

interface IInputProps {
  keyboardType?: any;
  name?: string;
  placeholder: string;
  value: string;
  setValue: (prop: any) => void;
  style?: any;
  rest?: any;
  labelStyle?: any;
  placeholderColor?: string;
  inputRef?: any;
}

export default function Input({
  keyboardType = "default",
  name = "",
  placeholder,
  value = "",
  setValue,
  style,
  placeholderColor = "black",
  labelStyle = {},
  inputRef,
  ...rest
}: IInputProps) {
  return (
    <View style={styles.container}>
      {name !== "" && <Text style={[styles.label, labelStyle]}>{name}</Text>}
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={[styles.input, style]}
        {...rest}
        ref={inputRef}
      />
    </View>
  );
}
