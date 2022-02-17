import {
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TextStyle,
} from "react-native";
import styles from "./styles";
import React from "react";

interface InputProps extends TextInputProps {
  name?: string;
  placeholder: string;
  value: string;
  setValue?: (text: string) => void;
  style?: StyleProp<ViewStyle & TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  placeholderColor?: string;
  inputRef?: any;
  helperText?: string;
  helperStyle?: StyleProp<TextStyle>;
}

export default function Input({
  name,
  placeholder,
  value = "",
  setValue,
  style,
  placeholderColor = "black",
  labelStyle = {},
  inputRef,
  helperText,
  helperStyle,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {typeof name !== "undefined" && (
        <Text style={[styles.label, labelStyle]}>{name}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={[styles.input, style]}
        ref={inputRef}
        {...rest}
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
            helperStyle,
          ]}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
}
