import {
  Keyboard,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SearchBar from "../../modules/Searchbar/SearchBar";
import { Colors } from "../../constants/styles";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";
import ProductsCarusel from "../../modules/ProductsCarusel/ProductsCarusel";
import { useCallback } from "react";

export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);

  const close = () => {
    setShowOverlay(false);
    Keyboard.dismiss();
  };

  const open = (callback: () => void) => {
    setShowOverlay(true);
    callback();
  };

  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar open={open} close={close} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
      >
        <ProductsCarusel
          path="/products/good-rated"
          title="Best Rated"
          sharedID="MostSearched"
          refresh={refresh}
        />
        <ProductsCarusel
          path="/products/searched-products"
          title="Your searches"
          sharedID="WatchedByYou"
          refresh={refresh}
        />
        <ProductsCarusel
          path="/products"
          title="All products"
          sharedID="All"
          refresh={refresh}
        />
      </ScrollView>

      {showOverlay && <Overlay close={close}></Overlay>}
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
  scrollView: {},
});
