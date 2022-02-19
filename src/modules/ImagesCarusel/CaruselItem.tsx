import { Dimensions, StyleSheet, Image } from "react-native";
import Ripple from "react-native-material-ripple";

import { SharedElement } from "react-navigation-shared-element";

interface CaruselItemProps {
  source: string;
  prod_id?: number;
  sharedID?: string;
  onPress: (image: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH,
    height: 260,
  },
});

export default function CaruselItem({
  source,
  prod_id,
  sharedID,
  onPress,
}: CaruselItemProps) {
  return (
    <Ripple rippleColor="white" onPress={() => onPress(source)}>
      <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
        <Image
          source={{ uri: source }}
          style={[styles.img]}
          resizeMode="cover"
          resizeMethod="scale"
        />
      </SharedElement>
    </Ripple>
  );
}
