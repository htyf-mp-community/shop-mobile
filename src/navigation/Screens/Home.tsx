import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SearchBar from "../../modules/SearchBar";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
