import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import useFetch from "../../utils/hooks/useFetch";
import { ProductTypeProps } from "../Product/Product";
import dailyStyle from "./styles";
import { API } from "../../constants/routes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../../@types/types";
import AddToCart from "../AddToCart/AddToCart";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SkeletonPlaceholder } from "../../components";
import { notUndefined } from "../../functions/typecheckers";

interface DailySaleProps {}

export default function DailySale({}: DailySaleProps) {
  const { data, loading } = useFetch<ProductTypeProps>("/sales/daily", [], {});

  const navigation = useNavigation<useNavigationProps>();

  function toProduct() {
    if (data.prod_id) {
      navigation.navigate("Details", {
        image: `${API}/upload/images=${data?.img_id[0]?.name}`,
        prod_id: data.prod_id,
        sharedID: "DAILY",
        title: data.title,
      });
    }
  }

  const isFocused = useIsFocused();

  const { width } = useWindowDimensions();

  return (
    <View style={[dailyStyle.container]}>
      <Text style={[dailyStyle.title]}>Daily Sale</Text>

      {typeof data.prod_id !== "undefined" && (
        <View style={[{ alignItems: "center", position: "relative" }]}>
          <TouchableOpacity activeOpacity={0.9} onPress={toProduct}>
            <SharedElement id={`prod_id.${data?.prod_id}DAILY`}>
              <Image
                style={dailyStyle.image}
                resizeMode="cover"
                source={{
                  uri: `${API}/upload/images=${data?.img_id[0]?.name}`,
                }}
              />
            </SharedElement>
          </TouchableOpacity>
          {isFocused && (
            <Animated.View
              style={[dailyStyle.buttonsContainer]}
              entering={FadeIn.delay(500).duration(100)}
              exiting={FadeOut}
            >
              <Text style={[dailyStyle.price]}>${data?.price}</Text>
              <AddToCart
                iconStyle={{ color: "#000" }}
                prod_id={data.prod_id}
                relative
                text="Add"
                fontStyle={{ color: "#000" }}
                style={[dailyStyle.button, { backgroundColor: "#fff" }]}
              />
            </Animated.View>
          )}
        </View>
      )}
      {loading && !notUndefined(data.prod_id) && (
        <SkeletonPlaceholder
          backgroundColor={"#1f2b3d"}
          highlightColor={"#2a3a52"}
          size={{ width, height: 300 }}
        >
          <View style={{ width, height: 300, alignItems: "center" }}>
            <SkeletonPlaceholder.Item
              height={250}
              width={width - 20}
              margin={0}
            />
          </View>
        </SkeletonPlaceholder>
      )}
    </View>
  );
}
