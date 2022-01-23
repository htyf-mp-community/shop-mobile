import caruselStyles from "./caruselStyles";
import { Colors } from "../../constants/styles";
import { View, Text } from "react-native";
import styles from "../Product/styles";

export default function EmptyList({
  variant = "empty",
  error,
}: {
  variant: "empty" | "error";
  error?: string;
}) {
  if (variant === "error") {
    return (
      <View style={styles.container}>
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
