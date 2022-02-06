import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Colors } from "../../../constants/styles";
import { useUser } from "@utils/context/UserContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

interface IAvatarProps {
  hide?: boolean;
  style?: StyleProp<ViewStyle>;
  avatarStyles?: any;
}

export default function Avatar({
  hide = false,
  style,
  avatarStyles,
}: IAvatarProps) {
  const { user } = useUser();
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.avatar, avatarStyles]}>
        <Text style={{ fontSize: 50, color: "#fff" }}>
          {user?.name[0]?.toUpperCase() || ""}
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
    backgroundColor: Colors.primary100,
  },
  username: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
    marginTop: 15,
    fontSize: 25,
  },
});
