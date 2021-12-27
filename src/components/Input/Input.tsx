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
  setValue: (text: string) => void;
  style?: StyleProp<ViewStyle & TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  placeholderColor?: string;
  inputRef?: any;
  helperText?: string;
}

/**
 * @param {String | undefined} name Label text placed above input field, if not defined will be omitted
 * @param {String} placeholder text displyed inside component, cannot be empty
 * @param {String} value React useState value
 * @param {Function} setValue React useState function
 * @param {StyleProp<ViewStyle & TextStyle>} style styling of the TextInput
 * @param {String} placeholderColor color of the placeholder
 * @param {StyleProp<TextStyle>} labelStyle styling of the label
 * @param {String} helperText text placed below TextInput, if undefined will be omitted
 **/

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
          ]}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
}
