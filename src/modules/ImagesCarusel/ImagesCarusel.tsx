import React, { useRef } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import { ProductImageProps } from "../../@types/types";
import { API } from "../../constants/routes";
import Dots from "../../components/Dots/Dots";
import CaruselItem from "./CaruselItem";
import { sortImages } from "../../functions/sortImages";

interface ImagesCaruselProps {
  sharedID: string;
  prod_id: number;
  images: ProductImageProps[];
  image: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function ImagesCarusel({
  sharedID,
  prod_id,
  images,
  image,
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
        data={[{ name: image, id: 0 }, ...images]}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => {
          if (item.id === 0) {
            return (
              <CaruselItem
                source={{ uri: image }}
                key={item.id}
                prod_id={prod_id}
                sharedID={sharedID}
              />
            );
          } else {
            return (
              <CaruselItem
                key={item.id}
                source={{ uri: `${API}/upload/images=${item.name}` }}
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
    </>
  );
}
