import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Dimensions, ScrollView, Animated } from "react-native";
import axios from "axios";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { Colors } from "../../constants/styles";
import AddToCart from "../../modules/AddToCart/AddToCart";
import Dots from "../../components/Dots/Dots";
import Ratings from "../../modules/Ratings";
import ImagesCarusel from "../../modules/ImagesCarusel/ImagesCarusel";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function ProductDetails({ route }: any) {
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

  const imgList: { name: string; id: number }[] = result?.img_id;
  const images = imgList?.length > 1 ? imgList.splice(1, imgList.length) : [];
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

  const scrollX = useRef(new Animated.Value(0)).current;

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
      <ImagesCarusel
        scrollX={scrollX}
        sharedID={sharedID}
        prod_id={prod_id}
        image={image}
        images={images}
      />

      <AddToCart
        prod_id={prod_id}
        style={{
          zIndex: 10,
          top: 260,
        }}
      />

      <Animated.View style={[styles.dots, { opacity }]}>
        <Dots arr={[...images, 1]} x={scrollX} />
      </Animated.View>

      <Animated.Text style={[styles.text, styles.title, { opacity }]}>
        {result?.title}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity, fontSize: 25 }]}>
        ${result?.price}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity, fontSize: 17 }]}>
        {result?.description}
      </Animated.Text>
      <Ratings ratings={result.rating_id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  text: {
    color: "white",
    fontSize: 18,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#292929",
    fontFamily: "PoppinsMedium",
  },
  dots: {
    position: "absolute",
    top: 210,
    zIndex: 11,
    flexDirection: "row",
    padding: 10,
    width: SCREEN_WIDTH,
    justifyContent: "center",
  },
  title: {
    fontSize: 31,
    padding: 10,
    paddingLeft: 15,
    fontFamily: "PoppinsBold",
  },
});