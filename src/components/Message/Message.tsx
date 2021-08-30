import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { Colors } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRef } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function Message({ status }: { status: string }) {
  const isFocused = useIsFocused();
  const scale = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();

  useEffect(() => {
    Animated.timing(scale, {
      useNativeDriver: true,
      toValue: 1,
      duration: 100,
    }).start();
  }, [isFocused]);

  useEffect(() => {
    const timeout = setTimeout(goHome, 2000);
    return () => clearTimeout(timeout);
  }, []);

  function goHome() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.message}>
      <Animated.View
        style={[
          styles.info,
          {
            transform: [{ scale }],
            backgroundColor: status === "Success" ? Colors.secondary : "red",
          },
        ]}
      >
        {status === "Success" ? (
          <MaterialIcons
            name="done"
            size={180}
            color="white"
            onPress={goHome}
          />
        ) : (
          <Entypo name="cross" size={180} color="white" onPress={goHome} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    position: "absolute",
    width: width,
    height: height,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 11,
  },
  info: {
    marginTop: 120,
    width: width / 1.2,
    height: width / 1.2,
    backgroundColor: Colors.secondary,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});
