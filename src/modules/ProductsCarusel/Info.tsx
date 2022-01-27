import caruselStyles from "./caruselStyles";
import { Colors } from "../../constants/styles";
import { View, Text, useWindowDimensions } from "react-native";
import styles from "../Product/styles";

export default function EmptyList({
  variant = "empty",
  error,
}: {
  variant: "empty" | "error";
  error?: string;
}) {
  const { width } = useWindowDimensions();
  if (variant === "error") {
    return (
      <View style={[styles.container, { width: width - 20 }]}>
        <View
          style={[
            styles.product,
            caruselStyles.errorContainer,
            { backgroundColor: Colors.primary100 },
          ]}
        >
          <Text style={[caruselStyles.errorText]}>
            {error || "Failed to fetch products"}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        caruselStyles.nothing,
        {
          backgroundColor: Colors.primary100,
          marginLeft: 10,
          borderRadius: 10,
        },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 30 }}>Nothing yet </Text>
    </View>
  );
}
