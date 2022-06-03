import React, { useRef } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import { ProductImageProps } from "/@types/types";
import { API } from "@constants/routes";
import Dots from "@components/Dots/Dots";
import CaruselItem from "./CaruselItem";

interface ImagesCaruselProps {
  sharedID: string;
  prod_id: number;
  images: ProductImageProps[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function ImagesCarusel({
  sharedID,
  prod_id,
  images,
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
        renderItem={({ item, index }) => {
          if (item.id === 0) {
            return (
              <CaruselItem
                source={`${API}/upload/images=${item.name}`}
                prod_id={prod_id}
                sharedID={sharedID}
              />
            );
          }
          return (
            <CaruselItem
              key={item.id}
              source={`${API}/upload/images=${item.name}`}
            />
          );
        }}
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
