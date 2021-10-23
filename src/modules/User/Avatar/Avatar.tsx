import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles";
import { useUser } from "../../../context/UserContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

interface IAvatarProps {
  avatar?: string; // required later
  hide?: boolean;
  style?: any;
}

export default function Avatar({ avatar, hide = false, style }: IAvatarProps) {
  const { user } = useUser();
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.avatar]}>
        <Text style={{ fontSize: 50, color: "#fff" }}>
          {user.name[0].toUpperCase()}
        </Text>
      </View>
      {!hide && (
        <>
          <Text style={styles.username}>
            Hi!{" "}
            <Text style={{ color: Colors.secondary }}>
              {user?.name.split("@")[0]}
            </Text>
          </Text>
          <Text style={[styles.username, { fontSize: 15, marginTop: 5 }]}>
            since 28.08.2021
          </Text>
        </>
      )}
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
    marginTop: 10,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  username: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
    marginTop: 15,
    fontSize: 25,
  },
});
