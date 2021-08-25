import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { h3, Colors } from "../../constants/styles";

type SliderProps = {
  children: React.ReactNode;
  title: string;
};

export default function HorizontalSlider({ children, title }: SliderProps) {
  return (
    <View>
      <Text style={[h3, styles.text]}>{title}</Text>
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
