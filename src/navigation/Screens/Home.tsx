import {
  Keyboard,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import SearchBar from "../../modules/Searchbar/SearchBar";
import { Colors } from "../../constants/styles";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";
import ProductsCarusel from "../../modules/ProductsCarusel/ProductsCarusel";
import { useCallback } from "react";
import Button from "../../components/Button/Button";
import { ENDPOINTS } from "../../constants/routes";

export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({ route, navigation }: any) {
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
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
      >
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

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Button
            callback={() => navigation.navigate("User")}
            text="Profile"
            style={{ width: "100%" }}
          />
        </View>
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
});
