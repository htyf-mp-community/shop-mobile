import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import Layout from "../../../constants/layout";
import { Colors } from "../../../constants/styles";
import Color from "color";
import { useState, useCallback } from "react";
import Ripple from "react-native-material-ripple";
import { AntDesign } from "@expo/vector-icons";

import { FlatList } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";

interface Props<T> {
  options: T[];

  multiSelect?: boolean;

  selected: T[];

  renderDefaultItem?: boolean;

  singleTileHeight?: number;

  containerStyle?: StyleProp<ViewStyle>;

  maxSelectHeight?: number;

  onClose?: () => void;

  setSelected: (selected: T[]) => void;

  keyExtractor?: (item: T, index: number) => string;

  transparentOverlay?: boolean;

  renderItem?: (props: { item: T; index: number }) => ListRenderItem<T>;

  placeholderText?: string;

  displayAboveInput?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export default function Select({
  options = [],
  multiSelect = false,
  selected,
  setSelected,
  keyExtractor,
  renderItem,
  renderDefaultItem = true,
  singleTileHeight = 50,
  onClose,
  containerStyle,
  maxSelectHeight,
  transparentOverlay = true,
  placeholderText = "Select option",
  displayAboveInput = false,
}: Props<any>) {
  const [isFocused, setIsFocused] = useState(false);

  const SINGLE_TILE_HEIGHT = singleTileHeight;

  const backgroundColor = Color(Colors.primary).lighten(0.5).hex();

  const addSelectedItem = (item: (typeof options)[0]) => {
    if (multiSelect) {
      if (selected.includes(item)) {
        setSelected(selected.filter((i) => i !== item));
      } else {
        setSelected([...selected, item]);
      }
      return;
    }
    setSelected([item]);
  };

  const ABS_LIST_HEIGHT = SINGLE_TILE_HEIGHT * options.length;

  const DefaultRenderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <Ripple
          onPress={() => addSelectedItem(item)}
          style={{
            height: ABS_LIST_HEIGHT / options.length,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor:
              options.length - 1 === index ? "transparent" : Colors.active,
            backgroundColor: selected.includes(item)
              ? Color(Colors.active).darken(0.7).hex()
              : undefined,
          }}
        >
          <Text style={{ color: Colors.active, fontSize: 18 }}>{item}</Text>
          {selected.includes(item) && (
            <AntDesign name="check" size={25} color={Colors.active} />
          )}
        </Ripple>
      ) as any;
    },
    [selected, addSelectedItem]
  );

  return (
    <>
      {isFocused && (
        <AnimatedPressable
          entering={FadeIn}
          exiting={FadeOut}
          onPress={() => {
            setIsFocused(false);
            onClose?.();
          }}
          style={{
            position: "absolute",
            width: Layout.screen.width,
            height: Layout.screen.height,
            left: 0,
            top: 0,
            zIndex: 1000,
            backgroundColor: transparentOverlay
              ? "transparent"
              : "rgba(0,0,0,0.8)",
          }}
        />
      )}
      <View
        style={[
          {
            width: Layout.screen.width * 0.95,
            backgroundColor,
            borderColor: isFocused ? Colors.active : Colors.primary_light,
            borderWidth: 2,
            borderRadius: 5,
            position: "relative",
            zIndex: isFocused ? 1000 : 100,
          },
          containerStyle,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsFocused(!isFocused)}
          style={{
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              color: isFocused ? Colors.active : "gray",
            }}
          >
            {selected.length > 0 ? selected.join(", ") : placeholderText}
          </Text>

          <AntDesign
            name="close"
            size={25}
            color={isFocused ? Colors.active : "gray"}
          />
        </TouchableOpacity>

        {isFocused && (
          <AnimatedFlatlist
            entering={FadeInDown}
            exiting={FadeOutDown.duration(100)}
            style={{
              position: "absolute",
              top: displayAboveInput
                ? -(maxSelectHeight || ABS_LIST_HEIGHT) - 10
                : 65,
              height: maxSelectHeight || ABS_LIST_HEIGHT,
              backgroundColor,
              width: Layout.screen.width * 0.95,
              borderWidth: 2,
              borderColor: Colors.active,
              borderRadius: 5,
              left: -1,
              zIndex: 1100,
            }}
            contentContainerStyle={{
              justifyContent: "center",
            }}
            data={options as any}
            keyExtractor={keyExtractor || ((item, index) => index.toString())}
            renderItem={renderDefaultItem ? DefaultRenderItem : renderItem}
          />
        )}
      </View>
    </>
  );
}
