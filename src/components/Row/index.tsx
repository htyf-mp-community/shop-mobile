import { ReactNode } from "react";
import { FlexStyle, StyleProp, View, ViewStyle } from "react-native";

interface RowProps extends Pick<FlexStyle, "justifyContent"> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
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
