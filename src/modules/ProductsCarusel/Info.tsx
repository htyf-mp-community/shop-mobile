import caruselStyles from "./caruselStyles";
import { Colors } from "../../constants/styles";
import { View, Text, useWindowDimensions } from "react-native";
import styles from "../Product/styles";
import { MaterialIcons } from "@expo/vector-icons";

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
      <View style={[styles.container, { width: width }]}>
        <View
          style={[
            styles.product,
            caruselStyles.errorContainer,
            { backgroundColor: Colors.primary_light, width: width - 20 },
          ]}
        >
          <MaterialIcons name="error" size={100} color="white" />
          <Text style={[caruselStyles.errorText, { fontSize: 25 }]}>
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
          backgroundColor: Colors.primary_light,
          marginLeft: 10,
          borderRadius: 10,
        },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 30 }}>Nothing yet </Text>
    </View>
  );
}
