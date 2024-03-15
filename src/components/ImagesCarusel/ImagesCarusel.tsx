import React, { useRef } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import { ProductImageProps } from "/@types/types";
import { API } from "@constants/routes";
import Dots from "@components/Dots/Dots";
import CaruselItem from "./CaruselItem";
import Ripple from "react-native-material-ripple";
import layout from "constants/layout";

interface ImagesCaruselProps {
  sharedID: string;
  prod_id: number;
  images: ProductImageProps[];

  onPress?: (imgIndex: number) => void;
  height?: number;
}

const SCREEN_WIDTH = layout.screen.width;

export default function ImagesCarusel({
  sharedID,
  prod_id,
  images,
  onPress,
  height,
}: ImagesCaruselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
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
        data={images}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item, index }) => (
          <Ripple
            disabled={typeof onPress === "undefined"}
            onPress={() => onPress?.(index)}
          >
            <CaruselItem
              height={height}
              source={`${API}/upload/images=${item.name}`}
              {...(index === 0 && { prod_id, sharedID })}
            />
          </Ripple>
        )}
      />
      <View
        style={{
          position: "absolute",
          top: 220,
          zIndex: 11,
          flexDirection: "row",
          padding: 10,
          width: SCREEN_WIDTH,
          justifyContent: "center",
        }}
      >
        <Dots arr={new Array(images.length).fill(0)} x={scrollX} />
      </View>
    </>
  );
}
