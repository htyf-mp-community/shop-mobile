import { Dimensions, StyleSheet, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
  img: {
    width: SCREEN_WIDTH - 20,
    borderRadius: 5,
  },
  container: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface CaruselItemProps {
  source: string;
  prod_id?: number;
  sharedID?: string;

  height?: number;
}

export default function CaruselItem({
  source,
  prod_id,
  sharedID,
  height = 260,
}: CaruselItemProps) {
  return (
    <SharedElement
      style={styles.container}
      id={`prod_id.${prod_id}${sharedID}`}
    >
      <Image
        source={{ uri: source }}
        style={[styles.img, { height }]}
        resizeMode="cover"
        resizeMethod="scale"
      />
    </SharedElement>
  );
}
