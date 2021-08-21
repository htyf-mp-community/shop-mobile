import { Keyboard, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import SearchBar from "../../modules/SearchBar";
import { Colors } from "../../constants/styles";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";
import MostRecent from "../../modules/MostRecent";

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [data, setData] = useState([]);

  const close = () => {
    setShowOverlay(false);
    Keyboard.dismiss();
  };

  const open = () => setShowOverlay(true);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar open={open} close={close} setData={setData} />
      <ScrollView>
        <MostRecent path="/products" title="Most searched" />
        <MostRecent path="/products" title="Most searched" />
        <MostRecent path="/products" title="Most searched" />
        <MostRecent path="/products" title="Most searched" />
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
