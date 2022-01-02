import {
  Animated,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import SearchBar from "../../modules/Searchbar/SearchBar";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import ProductsCarusel from "../../modules/ProductsCarusel/ProductsCarusel";
import { useCallback } from "react";
import { ENDPOINTS } from "../../constants/routes";
import Sidebar from "../../modules/Sidebar";
import Categories from "../../modules/Categories";
import Newsletter from "../../components/Newsletter";
import { wait } from "../../functions/wait";

let isOpen = false;

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

  const translateX = useRef(new Animated.Value(0)).current;

  function ToggleSidebar() {
    if (!isOpen) {
      Animated.spring(translateX, {
        toValue: 250,
        useNativeDriver: true,
      }).start();
      isOpen = true;
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      isOpen = false;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar translateX={translateX}>
        <SearchBar toggleSidebar={ToggleSidebar} />
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
