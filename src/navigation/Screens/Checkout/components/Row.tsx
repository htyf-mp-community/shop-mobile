import { View, Dimensions } from "react-native";
import { ReactNode } from "react";

const { width } = Dimensions.get("screen");

export default function ({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      {children}
    </View>
  );
}
