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
import { Colors } from "constants/styles";

interface InputProps extends TextInputProps {
  name?: string;
  value: string;
  setValue?: (text: string) => void;
  style?: StyleProp<ViewStyle & TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  placeholderColor?: string;
  inputRef?: any;
  helperText?: string;
  helperStyle?: StyleProp<TextStyle>;
  error?: boolean;
}

export default function Input({
  name,
  value = "",
  setValue,
  style,
  placeholderColor = "black",
  labelStyle = {},
  inputRef,
  helperText,
  helperStyle,
  error,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {typeof name !== "undefined" && (
        <Text
          style={[
            styles.label,
            labelStyle,
            {
              color: error ? "#ff3030" : "#e0e0e0",
            },
          ]}
        >
          {name}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholderTextColor={error ? "#ff3030" : "white"}
        style={[
          styles.input,
          style,
          {
            borderWidth: 2,
            borderColor: error ? "#ff3030" : Colors.primary,
            color: error ? "#ff3030" : "white",
          },
        ]}
        ref={inputRef}
        {...rest}
      />
      {typeof helperText !== "undefined" && (
        <Text
          style={[
            styles.label,
            {
              color: error ? "#ff3030" : "#e0e0e0",
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
