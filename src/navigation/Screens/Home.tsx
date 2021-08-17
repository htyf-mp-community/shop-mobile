import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import SearchBar from "../../modules/SearchBar";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import { Colors } from "../../constants/styles";
import Product, { ProductTypeProps } from "../../modules/Product";
import { API } from "../../constants/routes";
import { useQuery } from "react-query";
import { useUser } from "../../context/UserContext";

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
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <HorizontalSlider title="Most searched">
        {data &&
          data.map((el: ProductTypeProps) => (
            <Product key={el.prod_id} {...el} />
          ))}
      </HorizontalSlider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
