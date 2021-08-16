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
}

export default function Input({
  keyboardType = "default",
  name = "",
  placeholder,
  value,
  setValue,
  style,
  ...rest
}: IInputProps) {
  return (
    <View style={styles.container}>
      {name !== "" && <Text style={styles.label}>{name}</Text>}
      <TextInput
        value={value}
        onChange={setValue}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}
