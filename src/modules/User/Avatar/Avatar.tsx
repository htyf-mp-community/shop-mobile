import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import { useUser } from "../../../context/UserContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

interface IAvatarProps {
  avatar?: string; // required later
}

export default function Avatar({ avatar }: IAvatarProps) {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            avatar ||
            "https://pbs.twimg.com/profile_images/573692360263004161/gOvizBEP_400x400.jpeg",
        }}
        style={styles.avatar}
      />
      <Text style={styles.username}>
        Hi!{" "}
        <Text style={{ color: Colors.secondary }}>
          {user?.name.split("@")[0]}
        </Text>
      </Text>
      <Text style={[styles.username, { fontSize: 15, marginTop: 5 }]}>
        since 28.08.2021
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 100,
  },
  username: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
    marginTop: 15,
    fontSize: 25,
  },
});
