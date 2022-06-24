import { ScrollView } from "react-native";
import React from "react";
import Sidebar from "@modules/Sidebar";
import Header from "modules/Header";
import Categories from "modules/Categories";
import Promotions from "modules/Promotions";
import DailySale from "modules/DailySale";
import AuctionsNavigator from "modules/AuctionsNavigator";
import Carusels from "./components/Carusels";
import useAnimate from "./hooks/useAnimate";

export default function Home() {
  const { animatedButtons, animatedStyle, toggle } = useAnimate();

  return (
    <Sidebar animatedStyle={animatedStyle} animatedButtons={animatedButtons}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Header toggleSidebar={toggle} />
        <Categories />

        <Promotions />

        <DailySale />

        <AuctionsNavigator />

        <Carusels />
      </ScrollView>
    </Sidebar>
  );
}
