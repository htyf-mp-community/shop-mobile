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
  sharedID: string;
  prod_id: number;
  images: { id: number; name: string }[];
  image: string;
  scrollX: Animated.Value;
}

/**
 * @param {String} sharedID thumbnail key
 * @param {Number} prod_id used for defining SharedElement id
 * @param {Array} images Array of Objects with id and image name
 * @param {String} image thumbnail url, must contain API+'/upload/images=${name}'
 * @param {Animated.Value} scrollX Animated.Value scroll event
 **/
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

      {images?.map(({ name, id }: { name: string; id: number }) => (
        <Image
          key={id}
          source={{ uri: `${API}/upload/images=${name}` }}
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
    zIndex: 1,
  },
});
