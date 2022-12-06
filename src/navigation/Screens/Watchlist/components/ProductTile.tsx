import { ProductMinified, useNavigationProps } from "/@types/types";
import layout from "constants/layout";
import { image } from "functions/image";
import { View, Image, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { IconButton } from "components";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";

interface ProductTileProps {
  product: ProductMinified;

  listIndex: number;
}

const TILES_PER_ROW = 2;

const TILE_GAP = 5;

const TILE_WIDTH = layout.screen.width / TILES_PER_ROW - TILE_GAP * 2;

export default function ProductTile({ product, listIndex }: ProductTileProps) {
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

  const [showControls, setShowControls] = useState(false);

  return (
    <Animated.View>
      <TouchableOpacity
        activeOpacity={0.9}
        // disabled={showControls}
        onPress={navigateToProduct}
        //  onLongPress={() => setShowControls((p) => !p)}
      >
        <Image
          style={{
            width: TILE_WIDTH,
            height: TILE_WIDTH * 1.4,
            borderRadius: 5,
          }}
          source={thumbnail}
        />

        {showControls && (
          <View
            // onPress={(event) => event.stopPropagation()}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 10,
              backgroundColor: "red",
            }}
          >
            <IconButton
              icon={<Feather name="trash" size={20} color="white" />}
              onPress={() => console.log("icon press")}
            />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
