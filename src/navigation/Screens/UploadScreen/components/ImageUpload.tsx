import { ScrollView, Text, Image, View } from "react-native";
import Ripple from "react-native-material-ripple";
import React, { useEffect, useState } from "react";

import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { Colors } from "constants/styles";
import { EvilIcons } from "@expo/vector-icons";
import layout from "constants/layout";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

interface ImageUploadProps {
  images: string[];

  handleSetImages: (image: string[]) => void;

  handleRemoveImage: (image: string) => void;
}

export default function ImageUpload({
  images,
  handleSetImages,
  handleRemoveImage,
}: ImageUploadProps) {
  const onPress = async () => {
    const result = await launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 9,
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) handleSetImages(result.assets.map((a) => a.uri));
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ripple
          style={{
            padding: 10,
            backgroundColor: Colors.primary,
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={onPress}
        >
          <EvilIcons name="image" size={24} color="white" />
          <Text style={{ color: "#fff", padding: 2.5 }}>ADD</Text>
        </Ripple>
      ),
    });
  }, []);

  return (
    <View
      style={{
        marginBottom: 20,
        width: layout.screen.width,
        overflow: "hidden",
        flex: 1,
      }}
    >
      {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
        {images.map((image) => (
          <Ripple key={image} onLongPress={() => handleRemoveImage(image)}>
            <Image
              style={{
                width: layout.screen.width / 2 - 10 - 2.5,
                height: 150,
              }}
              source={{
                uri: image,
                width: 100,
              }}
            />
          </Ripple>
        ))}
      </View> */}

      <MasonryFlashList
        data={images}
        numColumns={2}
        estimatedItemSize={150}
        renderItem={({ item: image, index }) => (
          <Ripple
            key={image}
            onLongPress={() => handleRemoveImage(image)}
            style={{
              padding: 5,
            }}
          >
            <Image
              style={{
                width: layout.screen.width / 2 - 7.5,
                height: 150,
                borderRadius: 10,
              }}
              source={{
                uri: image,
                width: 100,
              }}
            />
          </Ripple>
        )}
      />

      <Text style={{ color: "#fff", fontSize: 18 }}>
        Product's images ({images.length}/9)
      </Text>
    </View>
  );
}

// <Ripple key={image} onLongPress={() => handleRemoveImage(image)}>
//   <Image
//     style={{
//       width: layout.screen.width / 3 - 10,
//       height: 100,
//     }}
//     source={{
//       uri: image,
//       width: 100,
//     }}
//   />
// </Ripple>;
