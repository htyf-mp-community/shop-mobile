import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SearchBar from "../../modules/SearchBar";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import { Colors } from "../../constants/styles";
import Product, { ProductTypeProps } from "../../modules/Product";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import Overlay from "../../components/Overlay/Overlay";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const [showOverlay, setShowOverlay] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function FetchAllProducts() {
    try {
      setLoading(true);

      const response = await fetch(API + "/products", {
        headers: {
          token: user.token,
        },
      });
      const data = await response.json();
      if (data !== null) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchAllProducts();
  }, []);

  const close = () => {
    setShowOverlay(false);
    Keyboard.dismiss();
  };

  const open = () => {
    setShowOverlay(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar open={open} close={close} setData={setData} />
      <HorizontalSlider title="Most searched">
        {data?.map((el: ProductTypeProps) => (
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
