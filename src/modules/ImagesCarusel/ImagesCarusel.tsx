import React from "react";
import {
  ScrollView,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { API } from "../../constants/routes";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface ImagesCaruselProps {
  sharedID: string | number;
  prod_id: number;
  images: any[];
  image: string;
  scrollX: Animated.Value;
}

export default function ImagesCarusel({
  sharedID,
  prod_id,
  images,
  image,
  scrollX,
}: ImagesCaruselProps) {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
          useNativeDriver: false,
        }
      )}
    >
      <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
        <Animated.Image
          source={{ uri: image }}
          style={[styles.img]}
          resizeMode="cover"
          resizeMethod="scale"
        />
      </SharedElement>

      {images?.map(({ name, id }: any) => (
        <Image
          source={{ uri: `${API}/upload/images=${name}` }}
          key={id}
          style={styles.img}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH,
    height: 250,
  },
});