import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  View,
} from "react-native";
import axios from "axios";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { Colors } from "../../constants/styles";
import AddToCart from "../../modules/AddToCart";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const ReturnButton = ({
  navigation,
  color = "black",
}: {
  navigation: any;
  color?: string;
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.return}>
      <FontAwesome5 name="long-arrow-alt-left" size={25} color={color} />
    </TouchableOpacity>
  );
};

export default function ProductDetails({ route, navigation }: any) {
  const { prod_id, image } = route.params;
  const { user } = useUser();

  const [result, setResult] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(API + "/products/id=" + prod_id, {
          headers: {
            token: user.token,
          },
        });
        if (typeof response.data !== "undefined") {
          setResult(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
      delay: 500,
    }).start();
  }, [prod_id]);

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <Animated.View style={[styles.header, { opacity }]}>
        <View>
          <ReturnButton navigation={navigation} color="#000" />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            marginRight: 20,
            fontSize: 18,
            color: "rgba(255,255,255,0.50)",
          }}
        >
          {result?.category}
        </Text>
      </Animated.View>

      <View>
        <SharedElement id={"prod_id." + prod_id}>
          <Animated.Image
            source={{ uri: image }}
            style={[styles.img]}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </SharedElement>
        <Animated.View style={{ opacity }}>
          <AddToCart prod_id={prod_id} />
        </Animated.View>
      </View>

      <Animated.Text
        style={[
          styles.text,
          { opacity, fontSize: 35, padding: 5, marginLeft: 15 },
        ]}
      >
        {result?.title}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity }]}>
        ${result?.price}
      </Animated.Text>

      <Animated.Text style={[styles.text, { opacity }]}>
        {result?.description}
      </Animated.Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  img: {
    width: SCREEN_WIDTH,
    height: 300,
    marginTop: 80,
  },
  header: {
    width: SCREEN_WIDTH,
    paddingTop: 30,
    height: 80,
    position: "absolute",
    zIndex: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    opacity: 0,
  },
  return: {
    backgroundColor: "rgba(255,255,255,0.15)",
    width: 35,
    height: 35,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 20,
  },
});
