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
import useColorTheme, { ThemeContextType } from "utils/context/ThemeContext";
import Color from "color";

export interface RenderComponentProps {
  theme: ThemeContextType["theme"];
  isError: boolean;
  isTouched: boolean;

  color: string;
}

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

  leftIcon?:
    | ((prop: RenderComponentProps) => React.ReactNode)
    | React.ReactNode;

  /**
   * Icon to be displayed on the right side of the input
   **/

  rightIcon?:
    | ((prop: RenderComponentProps) => React.ReactNode)
    | React.ReactNode;

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

  const { theme } = useColorTheme();

  const renderProps = {
    isError: error || false,
    isTouched: isFocused,
    theme,
    color: error ? theme.error : isFocused ? theme.active : "#fff",
  };

  return (
    <View style={styles.container}>
      {typeof name !== "undefined" && (
        <Text
          style={[
            styles.label,
            labelStyle,
            {
              color: error ? "#ff3030" : isFocused ? Colors.active : "#fff",
            },
          ]}
        >
          {name}
        </Text>
      )}
      <View
        style={{
          backgroundColor: Colors.primary_light,
          borderRadius: 10,
          flexDirection: "row",
          width: (style as any)?.width ?? layout.screen.width * 0.95,
          borderWidth: 2,
          borderColor: error
            ? Colors.error
            : isFocused
            ? Colors.active
            : Color(Colors.primary_light).lighten(0.25).hex(),
          alignItems: "center",
        }}
      >
        {leftIcon && (
          <View style={{ paddingHorizontal: 7.5 }}>
            {typeof leftIcon === "function" ? leftIcon(renderProps) : leftIcon}
          </View>
        )}
        <TextInput
          spellCheck={false}
          value={value}
          onChangeText={setValue}
          placeholderTextColor={error ? "#ff3030" : "gray"}
          style={[
            styles.input,
            style,
            {
              borderWidth: 0,
              color: error ? "#ff3030" : isFocused ? Colors.active : "#fff",
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
          <View style={{ paddingHorizontal: 7.5 }}>
            {typeof rightIcon === "function"
              ? rightIcon(renderProps)
              : rightIcon}
          </View>
        )}
      </View>
      {typeof helperText !== "undefined" && (
        <Text
          style={[
            styles.label,
            {
              color: error ? "#ff3030" : isFocused ? Colors.active : "#fff",
              fontSize: 15,
              fontWeight: "400",
              marginLeft: 5,
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
