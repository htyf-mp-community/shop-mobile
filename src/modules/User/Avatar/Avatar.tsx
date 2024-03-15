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
          style={{ width: 60, height: 60 }}
          source={{
            uri: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png",
          }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginTop: 10,
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
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
