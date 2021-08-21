import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import axios from "axios";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ReturnButton = ({ navigation }: { navigation: any }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.return}>
      <FontAwesome5 name="long-arrow-alt-left" size={25} />
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
      duration: 200,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, [prod_id]);

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <Animated.View style={[styles.header, { opacity }]}>
        <ReturnButton navigation={navigation} />
        <Text style={{ fontWeight: "bold", marginRight: 20, fontSize: 18 }}>
          {result?.title}
        </Text>
      </Animated.View>

      <Image source={{ uri: image }} style={styles.img} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: SCREEN_WIDTH,
    height: 300,
    marginTop: 30,
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
    backgroundColor: "rgba(255,255,255,0.8)",
    opacity: 0,
  },
  return: {
    backgroundColor: "rgba(0,0,0,0.15)",
    width: 35,
    height: 35,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
