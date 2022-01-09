import React, { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ProductImageProps } from "../../@types/types";
import { API } from "../../constants/routes";
import Dots from "../../components/Dots/Dots";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ImagesCaruselProps {
  sharedID: string;
  prod_id: number;
  images: ProductImageProps[];
  image: string;
}

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH,
    height: 250,
    zIndex: 1,
  },
});

export default function ImagesCarusel({
  sharedID,
  prod_id,
  images,
  image,
}: ImagesCaruselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        data={[{ name: image, id: 1 }, ...images]}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => {
          if (item.id === 1) {
            return (
              <SharedElement id={`prod_id.${prod_id}${sharedID}`} key={item.id}>
                <Animated.Image
                  source={{ uri: image }}
                  style={[styles.img]}
                  resizeMode="cover"
                  resizeMethod="scale"
                />
              </SharedElement>
            );
          } else {
            return (
              <Image
                key={item.id}
                source={{ uri: `${API}/upload/images=${item.name}` }}
                style={styles.img}
              />
            );
          }
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 210,
          zIndex: 11,
          flexDirection: "row",
          padding: 10,
          width: SCREEN_WIDTH,
          justifyContent: "center",
        }}
      >
        <Dots arr={[...images, 1]} x={scrollX} />
      </View>
    </View>
  );
}
