import {
  Animated,
  Easing,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
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

let isOpen = false;

const DURATION = 250;

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

  const translateList = useRef(new Animated.Value(0)).current;
  const translateNavigation = useRef(new Animated.Value(-200)).current;

  function ToggleSidebar() {
    if (!isOpen) {
      Animated.timing(translateList, {
        toValue: 250,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateNavigation, {
        toValue: 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      isOpen = true;
    } else {
      Animated.timing(translateList, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateNavigation, {
        toValue: -200,
        duration: DURATION,
        useNativeDriver: true,
      }).start();

      isOpen = false;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar
        translateX={translateList}
        translateNavigation={translateNavigation}
      >
        <Header toggleSidebar={ToggleSidebar} />
        <ScrollView
          bounces={true}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
          }
        >
          <Categories />

          <ProductsCarusel
            path={ENDPOINTS.dailySale}
            title="Today's discount"
            sharedID="Promotion"
            refresh={refresh}
            center
          />

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
