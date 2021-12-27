import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

interface SvgProps {
  svg: string;
  styles?: StyleProp<ViewStyle>;
  size: number;
}

export default function SvgComponent({ svg, styles, size }: SvgProps) {
  return <SvgXml xml={svg} width={`${size}px`} style={styles} />;
}
