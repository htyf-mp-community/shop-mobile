import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import Button from "../../components/Button/Button";
import { Colors } from "../../constants/styles";

import { AntDesign } from "@expo/vector-icons";
import Avatar from "../User/Avatar/Avatar";
import { useNavigationProps } from "../../@types/types";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

interface SidebarProps {
  children: React.ReactNode;
  translateX: Animated.Value;
  translateNavigation: Animated.Value;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  navigation: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH * 0.6,
    height: HEIGHT * 0.8,
  },
  head: {
    color: Colors.text,
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    marginBottom: 10,
    marginTop: 50,
  },
  button: {
    backgroundColor: Colors.primary100,
    flexDirection: "row-reverse",
    width: WIDTH * 0.5,
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
});

export default function Sidebar({
  children,
  translateX,
  translateNavigation,
}: SidebarProps) {
  const scale = translateX.interpolate({
    inputRange: [0, WIDTH / 4],
    outputRange: [1, 0.75],
    extrapolate: "clamp",
  });

  const navigation = useNavigation<useNavigationProps>();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.navigation,
          { transform: [{ translateX: translateNavigation }] },
        ]}
      >
        <Avatar
          hide={true}
          avatarStyles={{ backgroundColor: Colors.primary100 }}
        />
        {[
          { text: "Cart", icon: "shoppingcart" },
          { text: "User", icon: "user" },
        ].map(({ text, icon }, i) => {
          return (
            <Button
              key={i}
              icon={
                <AntDesign
                  //@ts-ignore
                  name={icon}
                  style={{ marginRight: 10 }}
                  size={30}
                  color={Colors.text}
                />
              }
              style={styles.button}
              text={text}
              /* @ts-ignore */
              callback={() => navigation.navigate(text)}
            />
          );
        })}
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [{ translateX }, { scale }],
            backgroundColor: Colors.primary,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}
