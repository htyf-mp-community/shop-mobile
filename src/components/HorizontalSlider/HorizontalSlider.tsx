import React from "react";
import { ScrollView, StyleSheet, View, Text, ViewProps } from "react-native";
import { h3, Colors } from "../../constants/styles";

type SliderProps = ViewProps & {
  children: React.ReactNode;
  title: string;
};

/**
 * @param {String} title text displayed above list
 * @param {Node} children Node elements
 **/

export default function HorizontalSlider({
  children,
  title,
  ...rest
}: SliderProps) {
  return (
    <View {...rest}>
      <Text style={[h3, styles.text, { marginBottom: 10 }]}>{title}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces
      >
        {children}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    paddingLeft: 10,
    color: Colors.text,
    fontFamily: "PoppinsBold",
  },
});
