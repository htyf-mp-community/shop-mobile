import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "../../../constants/styles";
import { useState } from "react";
import ProductsCarusel from "../../../modules/ProductsCarusel/ProductsCarusel";
import { useCallback } from "react";
import { ENDPOINTS } from "../../../constants/routes";
import Sidebar from "../../../modules/Sidebar";
import Categories from "../../../modules/Categories";
import Newsletter from "../../../components/Newsletter";
import { wait } from "../../../functions/wait";
import Header from "../../../modules/Header";
import DailySale from "../../../modules/DailySale";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const { width: WIDTH } = Dimensions.get("window");

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

  const translateX = useSharedValue(0); // to -200
  const isOpen = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, WIDTH / 4],
      [1, 0.75],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateX: translateX.value }, { scale }],
    };
  }, []);

  const animatedButtons = useAnimatedStyle(() => {
    const translationX = interpolate(
      translateX.value,
      [0, WIDTH * 0.7],
      [-300, 0]
    );
    return {
      transform: [{ translateX: translationX }],
    };
  });
  const start = useSharedValue(0);

  function toggle() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      translateX.value = withTiming(WIDTH * 0.7);
    } else {
      translateX.value = withTiming(0);
      start.value = 0;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={Colors.primary} translucent />
      <Sidebar animatedStyle={animatedStyle} animatedButtons={animatedButtons}>
        <ScrollView
          alwaysBounceVertical
          stickyHeaderIndices={[0]}
          bounces={true}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
          }
        >
          <Header toggleSidebar={toggle} />
          <Categories />

          <DailySale />

          <ProductsCarusel
            path={ENDPOINTS.goodRatedProducts}
            title="Best Rated"
            sharedID="MostSearched"
            refresh={refresh}
          />

          <ProductsCarusel
            path={ENDPOINTS.searchedProducts}
            title="Your searches"
            sharedID="WatchedByYou"
            refresh={refresh}
          />
          <ProductsCarusel
            path={ENDPOINTS.productsAll}
            title="All products"
            sharedID="All"
            refresh={refresh}
          />

          <Newsletter />
        </ScrollView>
      </Sidebar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  text: {
    color: "white",
    fontFamily: "PoppinsRegular",
    padding: 20,
  },
});
