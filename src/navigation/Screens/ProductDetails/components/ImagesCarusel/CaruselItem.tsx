import { Dimensions, StyleSheet, Image } from "react-native";

import { SharedElement } from "react-navigation-shared-element";

interface CaruselItemProps {
  source: string;
  prod_id?: number;
  sharedID?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH - 20,
    height: 260,
    borderRadius: 5,
  },
  container: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function CaruselItem({
  source,
  prod_id,
  sharedID,
}: CaruselItemProps) {
  return (
    <SharedElement
      style={styles.container}
      id={`prod_id.${prod_id}${sharedID}`}
    >
      <Image
        source={{ uri: source }}
        style={[styles.img]}
        resizeMode="cover"
        resizeMethod="scale"
      />
    </SharedElement>
  );
}
