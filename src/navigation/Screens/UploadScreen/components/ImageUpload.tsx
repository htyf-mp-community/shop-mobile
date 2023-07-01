import { ScrollView, Text, Image, View } from "react-native";
import Ripple from "react-native-material-ripple";
import React, { useState } from "react";

import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { Colors } from "constants/styles";
import { EvilIcons } from "@expo/vector-icons";
import layout from "constants/layout";

interface ImageUploadProps {
  images: string[];

  handleSetImages: (image: string) => void;

  handleRemoveImage: (image: string) => void;
}

export default function ImageUpload({
  images,
  handleSetImages,
  handleRemoveImage,
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
    <View
      style={{
        marginBottom: 20,
        width: layout.screen.width - 20,
        overflow: "hidden",
      }}
    >
      <ScrollView
        horizontal
        style={{
          width: "100%",
          height: 100,
          marginBottom: 5,
        }}
      >
        <Ripple
          onPress={onPress}
          style={{
            width: 100,
            height: 100,
            backgroundColor: Colors.primary_light,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EvilIcons name="plus" size={50} color="white" />
        </Ripple>

        {images.map((image, index) => (
          <Ripple key={image} onLongPress={() => handleRemoveImage(image)}>
            <Image
              style={{
                width: 150,
                height: 100,
                marginLeft: index !== 0 ? 10 : 0,
              }}
              source={{
                uri: image,
                width: 100,
              }}
            />
          </Ripple>
        ))}
      </ScrollView>
      <Text style={{ color: "#fff", fontSize: 18 }}>
        Product's images ({images.length}/9)
      </Text>
    </View>
  );
}
