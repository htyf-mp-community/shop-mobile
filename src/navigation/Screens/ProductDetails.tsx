import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Dimensions, ScrollView, Animated } from "react-native";
import axios from "axios";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { SharedElement } from "react-navigation-shared-element";
import { Colors } from "../../constants/styles";
import AddToCart from "../../modules/AddToCart";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function ProductDetails({ route, navigation }: any) {
  const { prod_id, image, sharedID } = route.params;
  const { user } = useUser();

  const [result, setResult] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(API + "/products/id=" + prod_id, {
          headers: {
            token: user.token,
          },
        });
        if (typeof response.data !== "undefined") {
          setResult(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const images: { name: string; id: number }[] = result?.img_id;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
      delay: 500,
    }).start();
  }, [prod_id]);

  const ScrollYPos = useRef(new Animated.Value(0)).current;

  /* const smth = ScrollYPos.interpolate({
    inputRange: [0, 200],
    outputRange: [300, 100],
    extrapolate: "clamp",
  }); */

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      bounces
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: ScrollYPos } } }],
        {
          useNativeDriver: false,
        }
      )}
    >
      <ScrollView horizontal>
        <SharedElement id={"prod_id." + prod_id + sharedID}>
          <Animated.Image
            source={{ uri: image }}
            style={[styles.img]}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </SharedElement>

        <AddToCart prod_id={prod_id} />
      </ScrollView>

      <Animated.Text
        style={[
          styles.text,
          { opacity, fontSize: 35, padding: 5, marginLeft: 15 },
        ]}
      >
        {result?.title}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity }]}>
        ${result?.price}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity, fontSize: 17 }]}>
        {result?.description}
      </Animated.Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  img: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 20,
  },
});
