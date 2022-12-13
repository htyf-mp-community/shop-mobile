import { ProductMinified, useNavigationProps } from "/@types/types";
import layout from "constants/layout";
import { image } from "functions/image";
import { View, Image, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";

interface ProductTileProps {
  product: ProductMinified;

  listIndex: number;

  onLongProductPress: (prod: ProductMinified) => void;

  isExpanded: boolean;
}

const TILES_PER_ROW = 2;

const TILE_GAP = 5;

const TILE_WIDTH = layout.screen.width / TILES_PER_ROW - TILE_GAP * 2;

export default function ProductTile({
  product,
  listIndex,
  onLongProductPress,
  isExpanded,
}: ProductTileProps) {
  const navigation = useNavigation<useNavigationProps>();

  const thumbnail = image(product.img_id);

  function navigateToProduct() {
    navigation.navigate("Product", {
      image: thumbnail.uri,
      title: product.title,
      isSharedAnimationUsed: false,
      sharedID: "",
      prod_id: product.prod_id,
    });
  }

  return (
    <Animated.View style={{ marginBottom: 10 }}>
      <Ripple
        onLongPress={() => onLongProductPress(product)}
        onPress={navigateToProduct}
        //  onLongPress={() => setShowControls((p) => !p)}
      >
        <Image
          style={{
            width: isExpanded ? TILE_WIDTH * 2 + TILE_GAP * 2 : TILE_WIDTH,
            height: isExpanded ? TILE_WIDTH * 1.2 : TILE_WIDTH * 1.4,
            borderRadius: 5,
          }}
          source={thumbnail}
        />
      </Ripple>
    </Animated.View>
  );
}
