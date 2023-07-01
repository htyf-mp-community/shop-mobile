import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  StyleProp,
  Image,
} from "react-native";
import { Colors } from "../../../constants/styles";
import { useUser } from "@utils/context/UserContext";

import Animated from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

interface IAvatarProps {
  hide?: boolean;
  style?: StyleProp<ViewStyle>;
  avatarStyles?: any;
  animatedStyle?: any;
}

export default function Avatar({
  hide = false,
  style,
  avatarStyles,
  animatedStyle,
}: IAvatarProps) {
  const { user } = useUser();
  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      <View style={[styles.avatar, avatarStyles]}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png",
          }}
        />
      </View>
      {!hide && (
        <>
          <Text style={styles.username}>
            Hi!{" "}
            <Text style={{ color: Colors.secondary }}>
              {user?.name?.split("@")[0]}
            </Text>
          </Text>
        </>
      )}
    </Animated.View>
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
    backgroundColor: Colors.primary_light,
  },
  username: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
    marginTop: 15,
    fontSize: 25,
  },
});
