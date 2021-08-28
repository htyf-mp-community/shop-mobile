import React from "react";
import { SvgXml } from "react-native-svg";

interface SvgProps {
  svg: string;
  styles?: any;
  size: number;
}

export default function SvgComponent({ svg, styles, size }: SvgProps) {
  return <SvgXml xml={svg} width={`${size}px`} style={styles} />;
}
