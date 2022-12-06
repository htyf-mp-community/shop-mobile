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
import React, { useState } from "react";
import { Colors } from "constants/styles";
import layout from "constants/layout";

export interface InputProps extends TextInputProps {
  /**
   * Input label
   **/
  name?: string;
  /**
   * Input value
   **/
  value: string;
  /** 
   Input set text function
    **/
  setValue?: (text: string) => void;
  /**
   * input container style
   **/
  style?: StyleProp<ViewStyle & TextStyle>;
  /**
   * label style
   **/
  labelStyle?: StyleProp<TextStyle>;
  /**
   * placeholder color
   **/
  placeholderColor?: string;
  /**
   * ref
   **/
  inputRef?: any;
  /**
   * hint text
   **/
  helperText?: string;
  /**
   * hint text style
   **/
  helperStyle?: StyleProp<TextStyle>;
  /**
   * Is error state
   **/
  error?: boolean;

  /**
   * Icon to be displayed on the left side of the input
   **/

  leftIcon?: React.ReactNode;

  /**
   * Icon to be displayed on the right side of the input
   **/

  rightIcon?: React.ReactNode;

  /**
   * size of the input
   */
  size?: "small" | "medium" | "large";
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
  leftIcon,
  rightIcon,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

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
      <View
        style={{
          backgroundColor: Colors.primary100,
          borderRadius: 5,
          flexDirection: "row",
          width: (style as any)?.width ?? layout.screen.width * 0.95,
          borderWidth: 2,
          borderColor: error
            ? "#ff3030"
            : isFocused
            ? "#8408D4"
            : Colors.primary100,
          alignItems: "center",
        }}
      >
        {leftIcon && <View style={{ paddingHorizontal: 7.5 }}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholderTextColor={error ? "#ff3030" : "white"}
          style={[
            styles.input,
            style,
            {
              borderWidth: 0,
              color: error ? "#ff3030" : "white",
            },
          ]}
          ref={inputRef}
          onFocus={(event) => {
            setIsFocused(true);
            rest?.onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          {...rest}
        />
        {rightIcon && (
          <View style={{ paddingHorizontal: 7.5 }}>{rightIcon}</View>
        )}
      </View>
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
