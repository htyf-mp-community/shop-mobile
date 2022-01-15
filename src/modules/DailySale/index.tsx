import React from "react";
import { View, Text, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import useFetch from "../../hooks/useFetch";
import { ProductTypeProps } from "../Product/Product";
import dailyStyle from "./styles";
import { API } from "../../constants/routes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../../@types/types";
import AddToCart from "../AddToCart/AddToCart";

interface DailySaleProps {}

export default function DailySale({}: DailySaleProps) {
  const { data } = useFetch<ProductTypeProps>("/sales/daily", [], {});

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
          <View style={[dailyStyle.buttonsContainer]}>
            <Text style={[dailyStyle.price]}>${data?.price}</Text>
            <AddToCart
              prod_id={data.prod_id}
              relative
              text="Add"
              style={[dailyStyle.button]}
            />
          </View>
        </View>
      )}
    </View>
  );
}
