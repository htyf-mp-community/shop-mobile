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
  primary: "#121212",
  primary100: "#2F3135",
  primary200: "#262626",
  primary300: "#1c1c1c",
  primary400: "#0d0d0d",
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
