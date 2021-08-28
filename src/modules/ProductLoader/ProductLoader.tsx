import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import { Colors, radius } from "../../constants/styles";
import styles from "../Product/styles";

export default function ProductLoader() {
  const loader = useRef(new Animated.Value(0)).current;
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(loader, {
        useNativeDriver: false,
        toValue: 200,
        duration: 2000,
      }),
      Animated.timing(loader, {
        useNativeDriver: false,
        toValue: 0,
        duration: 2000,
      }),
    ]).start(({ finished }) => {
      if (finished) setTrigger(!trigger);
    });
  }, [trigger]);

  const backgroundColor = loader.interpolate({
    inputRange: [0, 200],
    outputRange: ["#1E1E1E", "#2b2b2b"],
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.product,
          {
            backgroundColor: backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.medium,
          },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.text} />
      </Animated.View>
    </View>
  );
}
