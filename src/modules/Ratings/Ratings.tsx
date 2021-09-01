import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { Colors } from "../../constants/styles";
import { Stars } from "../Stars/Stars";

export interface RatingProps {
  rating_id: number;
  rating: number;
  title: string;
  description: string;
}

const { width } = Dimensions.get("screen");

export default function Ratings({
  rating_id,
  rating,
  title,
  description,
}: RatingProps) {
  return (
    <View key={rating_id} style={styles.container}>
      <View style={{ flexDirection: "row", width: width * 0.3 }}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/573692360263004161/gOvizBEP_400x400.jpeg",
          }}
          style={styles.image}
        />
        <View style={{ width: width * 0.7, marginLeft: 10 }}>
          <Stars
            starStyle={{ flexDirection: "row", width: width * 0.7 }}
            rating={rating}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.text, { textAlign: "center" }]}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderWidth: 0.5,
    margin: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.5)",
  },
  title: {
    fontSize: 25,
    paddingLeft: 25,
    fontFamily: "PoppinsMedium",
    color: Colors.text,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 17,
    color: Colors.text,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
});
