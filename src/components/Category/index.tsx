import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../constants/styles";

type CategoryProps = Partial<View> & {
  category: string;
};

export default function Category({ category, ...rest }: CategoryProps) {
  return (
    <View style={{ backgroundColor: Colors.secondary, padding: 10 }} {...rest}>
      <Text style={{ color: "#fff" }}>{Category}</Text>
    </View>
  );
}
