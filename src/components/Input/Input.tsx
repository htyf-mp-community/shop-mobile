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
  secureTextEntry?: boolean;
  helperText?: string;
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
  secureTextEntry = false,
  helperText,
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
        secureTextEntry={secureTextEntry}
        {...rest}
        ref={inputRef}
      />
      {typeof helperText !== "undefined" && (
        <Text
          style={[
            styles.label,
            {
              color: "#e0e0e0",
              fontSize: 15,
              fontWeight: "400",
              marginLeft: 10,
            },
          ]}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
}
