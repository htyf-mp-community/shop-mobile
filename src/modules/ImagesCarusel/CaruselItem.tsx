import {
  ImageSourcePropType,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";

import { SharedElement } from "react-navigation-shared-element";

interface CaruselItemProps {
  source: ImageSourcePropType;
  prod_id?: number;
  sharedID?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH,
    height: 250,
  },
});

export default function CaruselItem({
  source,
  prod_id,
  sharedID,
}: CaruselItemProps) {
  return (
    <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
      <Image
        source={source}
        style={[styles.img]}
        resizeMode="cover"
        resizeMethod="scale"
      />
    </SharedElement>
  );
}
