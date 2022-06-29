import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type JustifyContent =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly";

interface RowProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  justifyContent?: JustifyContent;
}

export default function Row({ children, style, justifyContent }: RowProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
