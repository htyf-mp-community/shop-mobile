import layout from "constants/layout";
import { ProductImageProps } from "/@types/types";
import { image } from "functions/image";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";

import { IconButton } from "components";
import { AntDesign } from "@expo/vector-icons";

interface ImagesModalProps {
  visible: boolean;
  images: ProductImageProps[];

  onClose: () => void;
}

export default function ImagesModal({
  images,
  visible,
  onClose,
}: ImagesModalProps) {
  if (visible)
    return (
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
        style={{ zIndex: 10000, position: "absolute", top: 0 }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.9)" }}>
          <IconButton
            containerStyle={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 100,
            }}
            onPress={onClose}
            hideBackground
            icon={<AntDesign size={30} name="close" color={"#fff"} />}
          />
          <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
            {images.map((img, index) => (
              <GesturedImage key={img.id} index={index} name={img.name} />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    );

  return null;
}

export const GesturedImage = (item: { name: string; index: number }) => {
  const scale = useSharedValue(1);

  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const handleGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onEnd(() => (scale.value = withTiming(1)));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -layout.window.width / 2 },
      { translateY: -layout.window.height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: layout.window.width / 2 },
      { translateY: layout.window.height / 2 },
    ],
  }));

  const finalGesture = Gesture.Race(handleGesture);

  return (
    <GestureDetector gesture={finalGesture}>
      <Animated.Image
        source={image(item.name)}
        style={[
          {
            width: layout.window.width - 10,
            height: layout.window.height - 10,
            margin: 5,
            zIndex: 100,
          },
          animatedStyle,
        ]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
};
