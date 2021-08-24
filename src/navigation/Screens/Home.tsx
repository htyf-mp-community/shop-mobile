import { Keyboard, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import SearchBar from "../../modules/SearchBar";
import { Colors } from "../../constants/styles";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";
import ProductsCarusel from "../../modules/ProductsCarusel/ProductsCarusel";

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);

  const close = () => {
    setShowOverlay(false);
    Keyboard.dismiss();
  };

  const open = () => setShowOverlay(true);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar open={open} close={close} />
      <ScrollView>
        <ProductsCarusel
          path="/products/good-rated"
          title="Best Rated"
          sharedID="MostSearched"
        />
        <ProductsCarusel
          path="/products/searched-products"
          title="Watched by you"
          sharedID="WatchedByYou"
        />
        <ProductsCarusel
          path="/products"
          title="All available"
          sharedID="All"
        />
      </ScrollView>

      {showOverlay && <Overlay close={close} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
