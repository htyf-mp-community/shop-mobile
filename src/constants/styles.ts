import { TextStyle } from "react-native";

export const radius = {
  small: 5,
  medium: 10,
  large: 15,
};

export const fontSize = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
  paragraph: 14,
  small: 12,
  xs: 10,
};

export const Colors = {
  text: "#fff",
  primary: "#313131",
  primary100: "#dee3ea",
  primary200: "#262626",
  primary300: "#5d7290",
  primary600: "#323d4d",
  primary700: "#242c37",
  primary800: "#151a21",
  primary900: "#0b0e11",
  secondary: "#009950",
  secondary100: "#008a48",
  secondary300: "#00703b",
  secondary500: "#004f2a",
  ternary: "#2F4858",
  ternary200: "#223642",
  ternary400: "#1c2c36",
};

const textBase: TextStyle = {
  fontFamily: "PoppinsRegular",
  color: Colors.text,
};

export const h1: TextStyle = {
  ...textBase,
  lineHeight: 90,
  fontSize: fontSize.h1,
};

export const h2: TextStyle = {
  ...textBase,
  lineHeight: 64,
  fontSize: fontSize.h2,
};

export const h3: TextStyle = {
  ...textBase,
  lineHeight: 45,
  fontSize: fontSize.h3,
};

export const h4: TextStyle = {
  ...textBase,
  lineHeight: 32,
  fontSize: fontSize.h4,
  fontWeight: "700",
};

export const paragraph: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.paragraph,
  lineHeight: 22,
};

export const paragraphBold: TextStyle = {
  ...paragraph,
  fontWeight: "700",
};

export const small: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.small,
  lineHeight: 22,
};

export const smallBold: TextStyle = {
  ...small,
  fontWeight: "700",
};

export const xsmall: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.xs,
  lineHeight: 16,
};

export const xsmallBold: TextStyle = {
  ...xsmall,
  fontWeight: "700",
};
