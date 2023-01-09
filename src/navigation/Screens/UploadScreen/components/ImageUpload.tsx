import { ScrollView, Text, Image } from "react-native";
import Ripple from "react-native-material-ripple";
import React, { useState } from "react";

import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { Colors } from "constants/styles";
import { EvilIcons } from "@expo/vector-icons";

interface ImageUploadProps {
  images: string[];

  handleSetImages: (image: string) => void;
}

export default function ImageUpload({
  images,
  handleSetImages,
}: ImageUploadProps) {
  const onPress = async () => {
    const result = (await launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 9,
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
    })) as any;

    if (!result.cancelled) handleSetImages(result.uri);
  };

  return (
    <ScrollView
      horizontal
      style={{
        width: "100%",
        height: 100,
        marginBottom: 20,
      }}
    >
      {images.map((image, index) => (
        <Image
          key={image}
          style={{ width: 100, height: 100, marginLeft: index !== 0 ? 10 : 0 }}
          source={{
            uri: image,
            width: 100,
          }}
        />
      ))}

      <Ripple
        onPress={onPress}
        style={{
          width: 100,
          height: 100,
          backgroundColor: Colors.primary_light,
          marginLeft: images.length !== 0 ? 10 : 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EvilIcons name="plus" size={50} color="white" />
      </Ripple>
    </ScrollView>
  );
}
