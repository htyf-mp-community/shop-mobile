import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SearchBar from "../../modules/SearchBar";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import { Colors } from "../../constants/styles";
import Product, { ProductTypeProps } from "../../modules/Product";
import { API } from "../../constants/routes";
import { useQuery } from "react-query";
import { useUser } from "../../context/UserContext";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";

async function FetchProducts(token: string) {
  const response = await fetch(API + "/products", {
    headers: {
      token: token,
    },
  });
  return response.json();
}

export default function Home() {
  const { user } = useUser();
  const { data } = useQuery("fetch all products", () =>
    FetchProducts(user.token)
  );

  const [showOverlay, setShowOverlay] = useState(false);

  const close = () => {
    setShowOverlay(false);
    Keyboard.dismiss();
  };

  const open = () => {
    setShowOverlay(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar open={open} close={close} />
      <HorizontalSlider title="Most searched">
        {data &&
          data.map((el: ProductTypeProps) => (
            <Product key={el.prod_id} {...el} />
          ))}
      </HorizontalSlider>
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
