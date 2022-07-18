import { ProductRatingProps } from "/@types/types";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  useWindowDimensions,
} from "react-native";
import { Colors } from "../../constants/styles";
import { Stars } from "../Stars/Stars";

const { width } = Dimensions.get("screen");

export default function Ratings({
  rating,
  title,
  description,
}: Omit<ProductRatingProps, "user_id">) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width: width - 20 }]}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
          }}
          style={styles.image}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
        >
          <Text style={styles.text}>Jan Kowalski</Text>
          <Text style={[{ fontSize: 18, color: "#b5b5b5", marginLeft: 10 }]}>
            13 days ago
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.text, { fontSize: 25, fontWeight: "bold" }]}>
          {title}
        </Text>

        <Text style={styles.text}>{description}</Text>
      </View>

      <Stars
        rating={rating}
        starStyle={{ transform: [{ scale: 0.5 }], padding: 0, width: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary100,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "100%",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  header: {
    marginBottom: 10,
    flexDirection: "row",
  },
  text: {
    color: "#e3e3e3",
    fontSize: 20,
  },
  slider: {
    width: width - 20, // padding
    height: 250,
  },
});
